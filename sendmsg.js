// !!! PARAMTERS TO BE INTRODUCED BY USER !!!!
//-------------------------------------------
const C_OUT_DIR = './OUT';
const C_OUT_FILE = 'insta.csv';
const C_OUT_FILE2 = C_OUT_DIR + '/' + C_OUT_FILE;
const C_SCHED_FILE= './schedules/msg_schedules.csv'
const C_IG_ACCOUNTS_FILE="./accounts/ig_accounts.csv";
const C_INFLUENCER_FILE="./OUT/influencer.csv";
//-------------------------------------------
var GMaxToSwitch=1;
//-------------------------------------------
const instagram = require('./instagram');
var GSession;
var GAccountTab = [];
var GAccountInflTab = [];
var GAccountSchedTab = [];
var express = require('express');
var async1 = require('async');
var async2 = require('async');
var async3 = require('async');
var async4 = require('async');
var async5 = require('async');
var sleep = require('system-sleep');
var superagent = require('superagent');
var logger = require('superagent-logger');
var moment = require('moment-timezone');
var colors = require('colors');
var sleep = require('system-sleep');
//-------------------------------------------
const GAutoRespTimeSec  = 1000 ;// in seconds
const GSchedulerTimeSec = 6000 ;// in seconds
const GBulkMsgTimeSec   = 20 ;// in seconds
const GAutoRespTimeMSec = GAutoRespTimeSec*1000 ;// in milliseconds
const GSchedulerTimeMSec = GSchedulerTimeSec*1000 ;// in milliseconds
const GBulkMsgTimeMSec   = GBulkMsgTimeSec*1000 ;// in milliseconds

const GMessage0=' bulkmsg : Hello, i contact you, because of...';

const GResponderMsg = 'Hello,\n\
thank you for your message \n\
my name id David Gutanel,I am the CEO of BG-BI Corporation\n\
please send me your request at david.gutanel@bg-bi.com\n\
Regards';






colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

var _ = require('lodash');
var csv = require('csv-array');
var dateFormat = require('dateformat');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var jsdom = require('jsdom');
const {
  JSDOM
} = jsdom;
var xpath = require('xpath'),
  dom = require('xmldom').DOMParser


function log_error(p_str) {
  console.log(String(p_str).error);
}

function log_info(p_str) {
  console.log(String(p_str).info);
}

function log_warn(p_str) {
  console.log(String(p_str).warn);
}

function log_data(p_str) {
  console.log(String(p_str).data);
}

function log_verbose(p_str) {
  console.log(String(p_str).verbose);
}



var fs = require('fs');

function getFileContent(srcPath, callback) { 
    //log_verbose('function getFileContent');
	fs.readFile(srcPath, 'utf8', function (err, data) {
        if (err) callback(err);
        callback(null,data);
        }
    );
}

function copyFileContent(savPath, srcPath,callback) { 
    //log_verbose('function copyFileContent');
	getFileContent(srcPath, function(err,data) {
	    if (err) callback(err);
	    data=data.replace(/(\r\n)/g, '\n');
		fs.writeFile (savPath, data, function(err) {
            if (err)  callback(err);
            log_info('copyFileContent complete.');
			callback(null,null)
        });
    });
}


function dos2unixfile(file,callback){
log_verbose('    dos2unixfile file='+file);
copyFileContent(file,file,function(err,result){
   if(err) {
   log_error('dos2unixfile :'+err);
   callback(err);
   } else {
   log_verbose('    dos2unixfile complete..');
   callback(null,null);
   }
})

}

function dos2unixfile_p(file){
return new Promise((resolve,reject)=>{
  log_verbose('    (I.4.1) dos2unixfile_p file='+file);
  copyFileContent(file,file,function(err,result){
   if(err) {
     log_error('dos2unixfile :'+err);
     reject(err);
   } else {
     log_verbose('dos2unixfile complete..');
     resolve();
   }
})
})



}

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
//00000000000000000000000000000000000000000000000000000000000000000000000000000000000
 Date.prototype.yyyymmddhhmmss = function() {
   var yyyy = this.getFullYear();
   var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
   var dd  = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
   var hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
   var min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
   var ss = this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
   return ""+(yyyy)+"-"+(mm)+"-"+(dd)+" "+(hh)+":"+(min)+":"+(ss);
  };
  
function timeStamp2date(timeStamp_value){
	var n = Number(  String(timeStamp_value).substring(0, 100) );
	var theDate = new Date(n);
	dateString = theDate.yyyymmddhhmmss();
	//alert(dateString );
	return dateString ;
}

function date_now_log() {
var dd = new Date(Date.now());
 return  dd.yyyymmddhhmmss();
}

String.prototype.toDate = function(format)
{
  var normalized      = this.replace(/[^a-zA-Z0-9]/g, '-');
  var normalizedFormat= format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
  var formatItems     = normalizedFormat.split('-');
  var dateItems       = normalized.split('-');

  var yearIndex   = formatItems.indexOf("yyyy");
  var monthIndex  = formatItems.indexOf("mm");
  var dayIndex    = formatItems.indexOf("dd");  
  var hourIndex     = formatItems.indexOf("hh");
  var minutesIndex  = formatItems.indexOf("ii");
  var secondsIndex  = formatItems.indexOf("ss");

  var today = new Date();

  var year  = yearIndex>-1  ? dateItems[yearIndex]    : today.getFullYear();
  var month = monthIndex>-1 ? dateItems[monthIndex]-1 : today.getMonth();
  var day   = dayIndex>-1   ? dateItems[dayIndex]     : today.getDate();

  var hour    = hourIndex>-1      ? dateItems[hourIndex]    : today.getHours();
  var minute  = minutesIndex>-1   ? dateItems[minutesIndex] : today.getMinutes();
  var second  = secondsIndex>-1   ? dateItems[secondsIndex] : today.getSeconds();

  return new Date(year,month,day,hour,minute,second);
};

function date2timestamp(date){  
  return (Math.floor(date.getTime()))
}

function date_issued(c_date){
//c_date ="02/12/2017 19:14:10" 
var aa = c_date.toDate("DD/MM/YYYY hh:ii");
var bb = date2timestamp(aa);
var date_file_n = Number(bb);
var now_n = (Math.floor(Date.now()/1000 ))*1000;
var zz= now_n - date_file_n;

//console.log('date_now   ='+now_n+' '+timeStamp2date(now_n));
//console.log('date_file  ='+date_file_n+' '+timeStamp2date(date_file_n) +' '+c_date);
//console.log( zz )

if ( zz>0) {  
     console.log('date_file='+timeStamp2date(date_file_n) +' '+'date_now='+timeStamp2date(now_n)+'  ussued:OK')
	 return 'OK' ;  
	 }
     //console.log('date_file='+timeStamp2date(date_file_n) +' '+'date_now='+timeStamp2date(now_n)+'  ussued:KO')
	 return 'KO';
}

function serialize_object(obj) {
  const util = require('util');
  return (util.inspect(obj, {
    showHidden: false
    ,depth: 12
	,colorize:true
  }));
}



function whatIsIt(object) {
  var stringConstructor = "test".constructor;
  var arrayConstructor = [].constructor;
  var objectConstructor = {}.constructor;
  if (object === null) {
    return "null";
  } else if (object === undefined) {
    return "undefined";
  } else if (object.constructor === stringConstructor) {
    return "String";
  } else if (object.constructor === arrayConstructor) {
    return "Array";
  } else if (object.constructor === objectConstructor) {
    return "Object";
  } else {
    return "don't know";
  }
}
//00000000000000000000000000000000000000000000000000000000000000000000000000000000000
function cb(err,result) {
  if(err) {
      console.log('FAIL: ' + err.message);
    }else {
      //console.log();
    }
}

function __login(login, password,range,callback) {
  //console.log('login -->' + login + '  password=' + password);
  instagram.login(login, password)
    .then((session_) => {
      GSession = session_;
      GAccountTab[range]['session']=session_ ;
      log_info('login ok: Account ' + login);
      sleep(1000);
	  callback(null);
    })
    .catch((error) => {
      log_info('instagram.login :' + error);
	  log_warn('..Attempt to relog');
	  sleep(4000);
	  __login(login, password,range,(error2,result2)=>{
	    if (error2) {
		console.log('invalid Attempt to relog');
		console.log('error :'+error2);
		}
		callback(error2,result2)
	  });
    })

}



function __searchUserId(session, username,callback) {
  instagram.searchUsers(session, username)
    .then(profileInfo => {
      //log_info('profileInfo[0].id :' + profileInfo[0].id);
      //return (profileInfo[0].id);
      callback(null,session,profileInfo[0].id);
    })
    .catch(error => {
      log_error('instagram.searchUsers :' + serialize_object(error));
    })
}

function instagram_sendMessage(session, msg, recipient_id,callback){
  instagram.sendMessage(session, msg, recipient_id)
  .then( (result) =>{
      log_info('instagram_sendMessage msg->'+recipient_id);
	  callback(null,result);
	})
  .catch( (error) => { 
      log_error('instagram_sendMessage :'+error);
	  callback(error);	  
			 })
}

function __send_msg(session, msg, recipient,callback) {
  //var recipient_id = __searchUserId(session, recipient);
  //log_info('recipient_id = ' + recipient_id);
  //instagram.sendMessage  (session, msg, recipient);
  async5.waterfall(
  [async5.apply(__searchUserId,session,recipient),
  function(arg1,arg2,callback){callback(null,arg1,msg,arg2);},
  instagram_sendMessage,
  ],function(err, result) {
   if(err) {callback(err)};
   callback(null,result);
});


}

function minIndexGroup(group){
  for (var i=0;i<GAccountTab.length;i++){
    if (GAccountTab[i]["group"]==group ) {return i};
  }
  return -1;
}

function maxIndexGroup(group){
var max=-1;
  for (var i=0;i<GAccountTab.length;i++){
    if (GAccountTab[i]["group"]==group ) {max = i};
  }
  return max;
}

function __send_msg_grp(group,msg,recipient,callback ){
var idx =0;
//GMaxToSwitch

  for(var i=minIndexGroup(group);i<=maxIndexGroup(group);i++){
				console.log(group+'   '+i);
  // for the first execution pick only the first line of the group				
				if (GAccountTab[i]['current']==""){
					GAccountTab[i]['current']="Y";
					GAccountTab[i]['total_count']=1;
					GAccountTab[i]['count']=1;
					idx = i;
					log_warn('switch I');
					break;
				}
  // continue working on a valid member of the group			
				    if (   (GAccountTab[i]['current']=="Y")
					    && (GAccountTab[i]['count']<GMaxToSwitch)
					   ){
					     log_warn('switch II');
						 GAccountTab[i]['total_count']=GAccountTab[i]['total_count']+1;
						 GAccountTab[i]['count']=GAccountTab[i]['count']+1;
						 idx = i;
						 break;
					    }
  //switch to an other member of the group if current is full
    if (   (GAccountTab[i]['current']=="Y")
        && (GAccountTab[i]['count']>=GMaxToSwitch)
       ){
           GAccountTab[i]['count'] =0
           GAccountTab[i]['current']="N"
		   log_warn('switch III');
           if (i<maxIndexGroup(group)){  
		                              log_warn('switch III..(1)');
									  idx = i+1; 
									  GAccountTab[idx]['current']="Y";
									  GAccountTab[idx]['count']  =1;
									  GAccountTab[idx]['total_count']=1;
									  break;
							  }
            else { 
			  log_warn('switch III..(2)');
			  idx= minIndexGroup(group); 
			  GAccountTab[idx]['current']="Y";
			  GAccountTab[idx]['count']  =1;
			  GAccountTab[idx]['total_count']=1;
			  break;
		    }
        
        }
	}
  
  
  for (var tt=0;tt<GAccountTab.length;tt++){
    log_warn( tt+' : '+GAccountTab[tt]['current']+' '+GAccountTab[tt]['count']+' '+GAccountTab[tt]['total_count'] );	
  }
  
  log_error('grp : '+group+' idx : '+idx+'  --- msg  --->'+recipient);
  //log_error('min,max :'+minIndexGroup(group)+','+maxIndexGroup(group));
__send_msg(GAccountTab[idx]['session'],msg,recipient,(error,result)=>{
   if(error) { callback(error);}   
   callback(null,result);
});
}

function __send_msg_grp2(group,msg,recipient,idx){
   console.log('__send_msg_grp2 <Start>['+date_now_log()+']');
   return new Promise(function (resolve, reject){
      __send_msg_grp(group,msg,recipient,function (err, res){
	     if (err) { 
		  log_error('__send_msg_grp2 error:'+err);
		  reject(err);  }
		 else     { resolve({'result':'OK','idx':idx});}
         });
   })
}
//00000000000000000000000000000000000000000000000000000000000000000000000000000000000
app.get('/sendmsg', function(req, res) {
  //instagram.login('sdinaris', 'pswd')
  var w_name = req.query.name;

  log_info('debut...');
  //do_job();
  __login('sdinaris', 'pswd');
  sleep(8000);
  var user_id = __searchUserId(GSession, 'sdinari2');
  sleep(8000);
  log_info('user_id = ' + user_id);
  //__send_msg(GSession,'','');
  log_info('FIN...');
  //---- sendMessage = function (session, message, recipients)

  res.send('job submited...');
})

function load_recipient_accounts_p(){
	return new Promise((resolve,reject)=>{
		  log_verbose('  load_recipient_accounts_p() : <Start>');
		  csv.parseCSV(C_INFLUENCER_FILE, function(data) {
		  //log_info('  load_recipient_accounts() : data.length='+data.length);
			for (var i = 1; i < data.length; i++) {
			  var cols = data[i].split(";");
			  GAccountInflTab[i - 1] = {
				"id"       : cols[0],
				"username" : cols[1],
				"processed": cols[2]
			  };
			  //log_warn('load_recipient_accounts_p cols='+cols[0]);
			}

			 /*for (var i=0;i<GAccountInflTab.length;i++){
			   console.log(GAccountInflTab[i]['username']);
			   console.log(GAccountInflTab[i]);
			 }*/
             resolve();

		  
		  }, false);
		  
	})
}

function load_recipient_accounts(callback){
  log_info('  load_recipient_accounts() : <Start>');
  csv.parseCSV(C_INFLUENCER_FILE, function(data) {
  //log_info('  load_recipient_accounts() : data.length='+data.length);
    for (var i = 1; i < data.length; i++) {
      var cols = data[i].split(";");
      GAccountInflTab[i - 1] = {
        "username": cols[0],
        "processed": "N"
      };
      // console.log(cols[0]);
    }

     for (var i=0;i<GAccountInflTab.length-1;i++){
       //console.log(GAccountInflTab[i]['username']);
       //console.log(GAccountInflTab[i]);
     }


  callback(null);
  }, false);

}

function load_msg_schedules_p(){
return new Promise((resolve,reject)=>{
 log_verbose('    (I.4.2) load_msg_schedules_p <Start>');
 load_msg_schedules(function(err,result){
 if(err){reject(err);}
 resolve();
 })
})
}

function load_msg_schedules(callback){
  log_verbose('  load_msg_schedules() : <Start>');
  const CsvDb = require('csv-db');
  const csvDb = new CsvDb(C_SCHED_FILE);
 
  csvDb.get()
  .then((data) =>{
	  var idx=0;
	  for (var i = 0; i < data.length-1; i++) {
      
	  if (data[i]['processed'] != 'Y') { 
			  GAccountSchedTab[idx] = {
				"id"        : data[i]['id'],
				"username"  : data[i]['username'],
				"date"      : data[i]['date'],
				"msg"       : data[i]['msg'],
				"processed" : data[i]['processed'],
			  };
			  idx++;
	        }		  
	  }
               
	     /*
		 for (var i=0;i<GAccountSchedTab.length;i++){
         console.log(GAccountSchedTab[i]['username']+' '+GAccountSchedTab[i]['date']+' '+GAccountSchedTab[i]['msg']+' '+GAccountSchedTab[i]['processed']);       
         }*/		 
  //------
  callback(null,null);

  })
  .catch((err)=>{
    log_error('load_msg_schedules err:'+err);
	//callback(err);
  })
  
}  
  
/*
function load_msg_schedules(callback){
  log_info('  load_msg_schedules() : <Start>');
  csv.parseCSV("./schedules/msg_schedules.csv", function(data) {
  //log_info('  load_recipient_accounts() : data.length='+data.length);
    for (var i = 1; i < data.length; i++) {
      var cols = data[i].split(";");
	  //console.log(data[i]);
      GAccountSchedTab[i - 1] = {
        "username": cols[0],
        "date"    : cols[1],
		"msg"     : cols[2]
      };
      
    }

     for (var i=0;i<GAccountSchedTab.length;i++){
         console.log(GAccountSchedTab[i]['username']+' '+GAccountSchedTab[i]['date']+' '+GAccountSchedTab[i]['msg']);
       //console.log(GAccountSchedTab[i]);
     }


  callback(null);
  }, false);

}
*/


function load_accounts_file_p() {
	 return new Promise((resolve,reject) =>{
	   	 log_verbose('  load_accounts_file_p() : <Start>');
	  csv.parseCSV(C_IG_ACCOUNTS_FILE, function(data) {
		for (var i = 1; i < data.length; i++) {
		  var cols = data[i].split(";");
		  GAccountTab[i - 1] = {
			"group": cols[0],
			"login": cols[1],
			"password": cols[2],
			"current": "",
			"session":"",
			"total_count":0,
			"count":0
		  };
		   //console.log(cols[0]);
		}

		 for (var i=0;i<GAccountTab.length;i++){
		   console.log('    Grp :'+GAccountTab[i]['group']+' username='+GAccountTab[i]['login']);
		 }
		 resolve();
	  }, false);
	 })


}

function load_accounts_file(callback) {
 log_info('  load_accounts_file() : <Start>');
  csv.parseCSV(C_IG_ACCOUNTS_FILE, function(data) {
    for (var i = 1; i < data.length; i++) {
      var cols = data[i].split(";");
      GAccountTab[i - 1] = {
        "group": cols[0],
        "login": cols[1],
        "password": cols[2],
        "current": "",
        "session":"",
        "total_count":0,
        "count":0
      };
       //console.log(cols[0]);
    }

     for (var i=0;i<GAccountTab.length;i++){
       console.log('    Grp :'+GAccountTab[i]['group']+' username='+GAccountTab[i]['login']);
     }
     callback(null);
  }, false);
//callback(null);
}

function login_all_p(){
return new Promise((resolve,reject)=>{
  log_verbose('  login_all_p() : <Start>');
  log_info   ('    login_all_p() : GAccountTab.length='+GAccountTab.length);
   var function_array = [];
  for (var i = 0; i < GAccountTab.length; i++) {
  
  function_array.push(async4.apply(__login,GAccountTab[i]['login'],GAccountTab[i]['password'],i));
  }

   async4.waterfall(function_array,function(err, result) {
   // result now equals 'done'
   resolve();
 });
})
}

function login_all(callback){
  
  log_info('  login_all() : <Start>');
  log_info('  login_all() : GAccountTab.length='+GAccountTab.length);
   var function_array = [];
  for (var i = 0; i < GAccountTab.length; i++) {
  
  function_array.push(async4.apply(__login,GAccountTab[i]['login'],GAccountTab[i]['password'],i));
  }

   async4.waterfall(function_array,function(err, result) {
   // result now equals 'done'
   callback(null);
 });

}

function accounts_connect_all_p() {
return new Promise((resolve,reject)=>{
  log_verbose('accounts_connect_all_p <Start>');
  load_accounts_file_p()
  .then(res1 => {
        login_all_p()
		.then(res2=>{ console.log('accounts_connect_all_p login_all_p.OK');resolve();
		   //load_recipient_accounts_p()
		   //.then(res3=>{console.log('accounts_connect_all_p 3.OK');resolve()})
	    })
  });
})
}

function accounts_connect_all(callback) {
  log_info('accounts_connect_all() : <Start>');

  async3.waterfall(
    [load_accounts_file,
    login_all,
    load_recipient_accounts,
    ],function(err, result) {
    // result now equals 'done'
    callback(null);
  });


};


function accounts_auto_switch(callback) {
  log_info('accounts_auto_switch : <Start>');
  callback(null);
};

function __GetInboxLast(session,callback) {
  //console.log('login -->' + login + '  password=' + password);
  
  instagram.getChatList(session)
    .then((feed) => {
	
    if (    (typeof  feed     == "undefined") 
	     || (typeof  feed[0]  == "undefined")
		 //|| (typeof  feed[0]['_params']  == "undefined") 
		){
	log_warn('feed null');
	callback(null,null);
	return;
	}
   //****
   log_info('........');
   for(var i=0;i<feed[0]['_params']['items'].length;i++){
     //log_info(serialize_object(  feed[0]['_params']['items'][i] ) );
	 //var o_user_id  =feed[0]['_params']['users'][0]['pk'];
	 //var o_user_name=feed[0]['_params']['users'][0]['username'];
	 var o_user_id  =feed[0]['_params']['viewerId'];
	 var o_user_name=feed[0]['_params']['threadTitle'];
	 var to_user_id =feed[0]['_params']['items'][i]['user_id'];
	 var timestamp  =feed[0]['_params']['items'][i]['timestamp'];
	 var item_type  =feed[0]['_params']['items'][i]['item_type'];
	 
	 
	 
	 text = "";
	 if (item_type == "text") { 
	        var text      =feed[0]['_params']['items'][i]['text'];
	 }
	 //log_info(o_user_id+' <--> '+to_user_id+' '+timeStamp2date(timestamp)+' '+timestamp+' '+item_type+' '+text);
	 break;
   }
   
 
      callback(null,{"o_user_id":o_user_id,"to_user_id":to_user_id,"o_user_name":o_user_name,"session":session});
    })
    .catch((error) => {

      log_error('__GetInboxLast:' + error);
    })

}

function accounts_auto_responder_periodic_p(){
return new Promise((resolve,reject)=>{
  
  accounts_auto_responder_p()
  .then(res=>{})
  .catch(err=>{log_error('accounts_auto_responder_periodic_p err:'+err);})
  resolve();
})
}

function accounts_auto_responder_p(){
return new Promise((resolve,reject)=>{
	  log_verbose('accounts_auto_responder_p : <Start>['+date_now_log()+']');
		for (var ii=0;ii<GAccountTab.length;ii++){	  
				   __GetInboxLast(GAccountTab[ii]['session'],function(err,ChatUsers){
					if(err){console.log(err);}
					else{
					  if (ChatUsers == null) { 
						return;
						//callback(null,null);
					  }
					  if  ( ChatUsers.o_user_id != ChatUsers.to_user_id ) {
						  //__send_msg_grp(1,GResponderMsg,ChatUsers.o_user_name);
						  __send_msg(ChatUsers.session,GResponderMsg,ChatUsers.o_user_name,function(err,res){
						  if (err) {reject(err);}
								   //callback(null,res);
						  });
					  }
					  }
				  });
		}
		resolve(); 
})
}

function accounts_auto_responder(callback) {
  log_info('accounts_auto_responder : <Start>['+date_now_log()+']');
  		  
	for (var ii=0;ii<GAccountTab.length;ii++){	  
			   __GetInboxLast(GAccountTab[ii]['session'],function(err,ChatUsers){
				if(err){console.log(err);}
				else{
				  if (ChatUsers == null) { 
				    return;
					//callback(null,null);
				  }
				  if  ( ChatUsers.o_user_id != ChatUsers.to_user_id ) {
					  //__send_msg_grp(1,GResponderMsg,ChatUsers.o_user_name);
					  __send_msg(ChatUsers.session,GResponderMsg,ChatUsers.o_user_name,function(err,res){
					  if (err) {callback(err);}
					           //callback(null,res);
					  });
				  }
				  }
			  });
	}
   
  //sleep(GAutoRespTimeMSec);
  //accounts_auto_responder();
    callback(null,'OK'); 
  
};

function update_INFLUENCER_file(idx){
  console.log('update_INFLUENCER_file <Start>['+date_now_log()+']');
  //console.log('update_INFLUENCER_file idx='+idx);
  return new Promise((resolve,reject) => {
    log_verbose('update_INFLUENCER_file idx='+idx);
	const CsvDb = require('csv-db');
    const csvDb = new CsvDb(C_INFLUENCER_FILE);
	//id;username;date;msg;processed
	GAccountInflTab[idx]['processed'] = 'Y';
	const Influencerline = {    
                id          : GAccountInflTab[idx]['id'],
			    username    : GAccountInflTab[idx]['username'],
				processed   : GAccountInflTab[idx]['processed']
	};
	
    csvDb.update(Influencerline).then((data) => {
         log_verbose('update_INFLUENCER_file line='+Influencerline.id);
		 console.log('update_INFLUENCER_file <End>['+date_now_log()+']');
		 resolve('OK');
    }, (err) => {
	  lor_error('update_INFLUENCER_file error='+err);
	  reject(err);
	});
  })
}


function update_schedule_file(idx){
  console.log('update_schedule_file <Start>['+date_now_log()+']');
  return new Promise((resolve,reject) => {
    log_verbose('update_schedule_file idx='+idx);
	const CsvDb = require('csv-db');
    const csvDb = new CsvDb(C_SCHED_FILE);
	//id;username;date;msg;processed
	GAccountSchedTab[idx]['processed'] = 'Y';
	const schedline = {    
                id          : GAccountSchedTab[idx]['id'],
			    username    : GAccountSchedTab[idx]['username'],
		        date        : GAccountSchedTab[idx]['date'],
				msg         : GAccountSchedTab[idx]['msg'],
				processed   : 'Y'
	};
	
    csvDb.update(schedline).then((data) => {
         log_verbose('update_schedule_file line='+schedline.id);
		 console.log('update_schedule_file <End>['+date_now_log()+']');
		 resolve('OK');
    }, (err) => {
	  lor_error('update_schedule_file error='+err);
	  reject(err);
	});
  })
}

function execute_schedules_p(){
return new Promise((resolve,reject)=>{
log_verbose('    (I.4.3) execute_schedules_p <Start>');
execute_schedules(function(err,result){
if(err){resject(err);}
resolve();
})
})
}

function execute_schedules(callback){
     log_verbose('      execute_schedules <Start>['+date_now_log()+']');
	 log_verbose('GAccountSchedTab.length = '+GAccountSchedTab.length);
	 for(var ii=0;ii<GAccountSchedTab.length;ii++) {
	 
	 //console.log('dateF :'+GAccountSchedTab[ii]["date"]);
	 //console.log('processed ='+GAccountSchedTab[ii]["processed"]);
	 //console.log('dateL :'+date_now_log());
	 if (    ( date_issued(GAccountSchedTab[ii]["date"]) == 'OK' ) 
	      && ( GAccountSchedTab[ii]["processed"]         == 'N' )   )
	 {
		 sleep(1000);
		 log_warn('---> exec sched for :'+GAccountSchedTab[ii]["username"]+'  ii='+ii);
		 __send_msg_grp2(1,GAccountSchedTab[ii]["msg"],GAccountSchedTab[ii]["username"],ii)
		 .then((res)=>{
			 console.log('++++++execute_schedules idx='+res.idx);
			 update_schedule_file(res.idx)
			.then((result) => {log_verbose('+++++ update_schedule_file :'+result);    })
			.catch((error) => {log_error  ('----- error update_schedule_file'+error); })		
		 })
		 .catch((err)=>{console.log('Error execute_schedules :'+err);})
	 }
	 }
	 
	 //sleep(GSchedulerTimeMSec);
     console.log('execute_schedules <End>['+date_now_log()+']');
 
callback(null,null);
}

function schedule_messages(callback) {
  log_info('schedule_messages : <Start>['+date_now_log()+']');
    
	async2.waterfall(
       [ async2.apply(dos2unixfile,C_SCHED_FILE),
		 load_msg_schedules,
	     execute_schedules,
       ],function(err, result) {
      if(err) {
		  log_error('schedule_messages : <End>['+date_now_log()+'] err:'+err);
		  //callback(err);
		  }
		  log_verbose('schedule_messages : <End>['+date_now_log()+']');
		  //callback(null,null);
    });
  
};

function schedule_messages_periodic_p(){
	  return new Promise((resolve,reject)=>{
	  resolve();
	  
	  schedule_messages_p()
	  .then(res=>{})
	  .catch(err=>{log_error('schedule_messages_periodic_p err:'+err);})
	  
	  
	})
}

function schedule_messages_p(){

return new Promise((resolve,reject)=>{
  log_info('(I.4) schedule_messages_p : <Start>['+date_now_log()+']');
    
  dos2unixfile_p(C_SCHED_FILE)
  .then((res)=>{
           load_msg_schedules_p()
		   .then((res)=>{execute_schedules_p(); })		   
		   })
  
  //load_msg_schedules()
  //execute_schedules()
       
      
resolve('OK');
})
}

function set_GMaxGroup(){
  var max=0;
  for(var i=0;i<GAccountTab.length;i++){
    max = GAccountTab[i]['group'];
  }
  GMaxGroup = max;
}
var GMessageCount=0;
var GMaxGroup=3;

function send_bulk_messages_p(){
return new Promise((resolve,reject)=>{
	  log_verbose('send_bulk_messages_p : <Start>');
	  set_GMaxGroup();
	  dos2unixfile_p(C_INFLUENCER_FILE).then(res=>{})
	  load_recipient_accounts_p()
	  .then(res1=>{
			  log_warn('send_bulk_messages_p : GAccountInflTab.length='+GAccountInflTab.length);
			  for (var i=0;i<GAccountInflTab.length;i++){
				  if (GAccountInflTab[i].processed =='N'){
						var group = (GMessageCount % GMaxGroup)+1;
						sleep(300);
						log_info('  -->sending message Group='+group+'  username='+GAccountInflTab[i].username+' ** '+i);
						__send_msg_grp2(group,GMessageCount+'*'+GMessage0,GAccountInflTab[i].username,i)
						.then((res)=>{
						console.log('++++++send_bulk_messages_p idx='+res.idx);
						update_INFLUENCER_file(res.idx)
						.then((result) => {log_verbose('+++++ update_INFLUENCER_file :'+result);    })
						.catch((error) => {log_error  ('----- error update_INFLUENCER_file'+error); })
						})
						.catch((err)=>{console.log('Error send_bulk_messages_p :'+err);})
			
						//-----------
						GMessageCount++;
						//-----------
			      }
			  }

			resolve();
	  })

})
}

function send_bulk_messages(callback){
  log_info('send_bulk_messages : <Start>');
  set_GMaxGroup();
  for (var i=0;i<GAccountInflTab.length;i++){
	if ( GAccountInflTab[i].username == 'N') {
	        var group = (GMessageCount % GMaxGroup)+1;
			sleep(300);
			log_info('  -->sending message Group='+group+'  username='+GAccountInflTab[i].username+' ** '+i);
			__send_msg_grp(group,GMessageCount+'*'+GMessage0,GAccountInflTab[i].username);
			//-----------
			GMessageCount++;
			//-----------
	}
  }

callback(null);
};

//
// the main start up
function Start_Messaging_App() {
 ////sequence
 log_info('(I) Start_Messaging_App() : <Start> ');
 accounts_connect_all_p()
 .then(res0=>{
   /*
   log_warn('---------->schedule_messages_p');
   schedule_messages_periodic_p().then(res1=>{});
   log_warn('---------->send_bulk_messages_p');
   send_bulk_messages_p().then(res2=>{});
   log_warn('---------->accounts_auto_responder_periodic_p');
   accounts_auto_responder_periodic_p().then(res3=>{});
   */

   setInterval(schedule_messages_periodic_p      , GSchedulerTimeMSec);
   setInterval(send_bulk_messages_p              , GBulkMsgTimeMSec);
   setInterval(accounts_auto_responder_periodic_p, GAutoRespTimeMSec);
   
   
   /*
   Promise.all(
   [  schedule_messages_periodic_p()
     ,send_bulk_messages_p()
	 ,accounts_auto_responder_periodic_p()
    ]
   ).then(([result1, result2, result3]) => {
   
   })
   .catch(err => {
    // Receives first rejection among the Promises
    log_error('err ='+err);
   });*/
 })
 
 /*
 async1.waterfall([
        accounts_connect_all_p,
        //send_bulk_messages,
		accounts_auto_responder,
		schedule_messages_p,        
      ], function(err, result) {
    // result now equals 'done'
     if(err) {
       log_error('Start_Messaging_App Err:'+err);
     }else{
       log_info('(I) Start_Messaging_App() : <End>');
     }

  });
  */
}

app.listen('8080')
console.log('Magic happens on port 8080');
Start_Messaging_App();
//accounts_auto_responder();
exports = module.exports = app;
