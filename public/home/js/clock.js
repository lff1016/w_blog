var clock = document.getElementById('container')
//请求数据
fetch('https://wttr.in/'+returnCitySN["cip"]+'?format="%l+\\+%c+\\+%t+\\+%h"')
    .then(res=>res.text())
    .then(data => {
        var res_text = data.replace(/not found/g,'not found,not found').replace(/"/g,'').replace(/\+/g,'').replace(/,/g,'\\').replace(/ /g,'').replace(/°C/g,'');
        var res_list = res_text.split('\\');

        clock.innerHTML = `<div class="clock" id="clock">
                 <div class="clock-row">
            <!-- 当前日期 -->
            <span class="clock_date" id="clock_date"></span>
            <span class="clock_week" id="clock_week"></span>
            <span class="clock_weather">${res_list[2]}${res_list[3]}℃</span>
            <span class="clock_humidity">💧${res_list[4]}</span>
        </div>
        <div class="clock-row">
            <span class="clock_time" id="clock_time"></span>
        </div>
        <div class="clock-row">
            <span class="clock_ip">${returnCitySN["cip"]}</span>
            <span class="clock_city">${res_list[0]}</span>
            <span class="clock_am_pm" id="clock_am_pm"></span>
        </div>
    </div>`
        //获取星期几
        var weeks = ['日', '一', '二', '三', '四', '五', '六']

        function updateTime() {
            var now = new Date()
            var week = weeks[now.getDay()]
            var time = zeroPadding(now.getHours(), 2) + ':' + zeroPadding(now.getMinutes(), 2) + ':' + zeroPadding(now.getSeconds(), 2)
            var date = zeroPadding(now.getFullYear(), 4) + '-' + zeroPadding(now.getMonth(), 2) + '-' + zeroPadding(now.getDate(), 2)
            var am_pm = now.getHours()
            var am_pm_str
            if (am_pm > 12) {
                am_pm_str = 'PM'
            } else {
                am_pm_str = 'AM'
            }
            var clock_time = document.getElementById('clock_time')
            var clock_date = document.getElementById('clock_date')
            var clock_week = document.getElementById('clock_week')
            var clock_am_pm = document.getElementById('clock_am_pm')
            clock_date.innerHTML = date
            clock_week.innerHTML = week
            clock_time.innerHTML = time
            clock_am_pm.innerHTML = am_pm_str
        }
        //补全0
        function zeroPadding(num, digit) {
            var zero = ''
            for (var i = 0; i < digit; i++) {
                zero += '0'
            }
            return (zero + num).slice(-digit)
        }

        var timeId = setInterval(updateTime, 1000);
        updateTime()
    })
