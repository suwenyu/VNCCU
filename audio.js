


function parsetime(){
	var time = new Date().getTime();
	var date = new Date(time);
	n = date.toString()
	tokendate = n.split(" ");
	// console.log(tokendate);
	// console.log(tokendate[4]);
	// console.log(tokendate[0]);
	return tokendate;

}


// console.log(test);
// 
// 
function token(tokentime){
	
	var time_schedule = "";

	for ( j =0 ; j <2 ;j++)
	{
		// console.log(time_schedule[0]);
		time_schedule += tokentime[j]
	}
	// console.log(time_schedule);
	return time_schedule
}

function determine(nowtime, schedule)
{
	for (i in schedule)
		{
			// console.log(nowtime);
			// console.log(schedule[i]);
			if (Number(nowtime < Number(schedule[0])))
			{
				console.log("There are no shows recently.");
				break;
			}

			else if (Number(nowtime) > Number(schedule[schedule.length-1] ))
			{
				console.log("there is no shows recently.");
				break;
			}

			else if (Number(nowtime) < Number(schedule[i]) && Number(nowtime) >= Number(schedule[i-1]))
				return i-1;
			else
				continue;
		}
}

function main (){
	tokendate = parsetime();
	var day = tokendate[0];
	var time = tokendate[4];

	$.getJSON('http://sgnweb.nccu.edu.tw/vnccu/audio.json', function(json) {
			var schedule = [];
			schedulelength = json[day].length
			// console.log(json[day]);
			for ( i =0 ; i < json[day].length ; i++){
				
				tokentime = json[day][i].time.split(':');
				time_schedule = token(tokentime);

				schedule[i] = time_schedule;
			}

			for (i = 0 ; i < time.length ; i++)
			{
				tokentime = time.split(':');
				nowtime = token(tokentime);
			}
			console.log(nowtime);
			index = determine(nowtime , schedule);
			console.log(json[day][index].time , json[day][index].index , json[day][index].name);
			$('.dynamic_time').remove();
			$('.dynamic_index').remove();
			$('.dynamic_name').remove();
			$('.time').append('<div class="dynamic_time">' + json[day][index].time + '</div>');
			$('.index').append('<div class="dynamic_index">' + json[day][index].index + '</div>');
			$('.name').append('<div class="dynamic_name">' + json[day][index].name + '</div>');


			/*optional stuff to do after success */
	});

}

main();
setInterval(function(){ main(); }, 60000);

