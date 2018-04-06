var videoData;
jQuery(function() {
    var $ = jQuery;
    $.ajaxSetup({ cache: true });
    $.ajax({
    type:     'GET',
    url:      'https://merik.voicetube.com/demo/data',
    data:     {},
    dataType: 'json',
    success:  function(data)
                {
                    videoData = data;
                    var sortDataWithPublish = videoData.data.sort(function(last, next) {
                        return last.publish - next.publish;
                    });
                    loadVideo(sortDataWithPublish);
                },
    error:    function(error)
                {
                    console.log(error);
                }
    });
});

// 轉換 duration 格式為 HH:MM:SS
function convertTimeFormate (duration) {
    var hours   = Math.floor(duration / 3600);
    var minutes = Math.floor((duration - (hours * 3600)) / 60);
    var seconds = duration - (hours * 3600) - (minutes * 60);

    if (hours < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    if (hours <= 0) {
        return `${minutes}:${seconds}`;
    } else if (hours <= 0 && minutes <= 0) {
        return `${seconds}`;
    } else {
        return hours+':'+minutes+':'+seconds;
    }
}

// 插入影片卡片的 Dom 元素
function loadVideo(sortData) {
    var createVideo = sortData.map(function(index) {
        const videoTime = convertTimeFormate (index.duration);
        const videoLanguage = {
            'cht':"中文",
            'ja':"日文",
            'vi':"越南文",
            'en':"英文",
        }
        const videoLevel = {
            '1':"初級",
            '2':"中級",
            '3':"中高級",
            '4':"高級",
        }
        const languageBorder = index.captions.map(function(lang) {
            var self = this;
            return `<span class="info-btn level">${videoLanguage[lang]}</span>`;
        });
        return `<li class="single-video">
                    <div class="video-photo">
                        <div class="inner-photo">
                            <img src="${index.thumbnail}">
                        </div>
                        <span class="video-time">${videoTime}</span>
                    </div>
                    <div class="video-description">
                        <h5 class="video-title">${index.title}</h5>
                        <div class="video-viewer">
                            <i class="icon-headphone"></i>
                            ${index.views}
                        </div>
                        <div class="video-info">
                            ${languageBorder.join('')}
                            <span class="info-btn language">${videoLevel[index.level]}</span>
                        </div>
                    </div>
                </li>`;
    });
    document.querySelector('.nav-video').insertAdjacentHTML('beforeend', createVideo.join(''));
}

function removeBeforeFilterVideo () {
    const ulVideo = document.querySelector('.nav-video');

    while (ulVideo.firstChild) {
        ulVideo.removeChild(ulVideo.firstChild);
    }
}

/************** 點選排序的篩選 ***************/
document.getElementById('nav-sort').addEventListener('click', function(e) {
    const sortDataType = e.target.dataset.sort;
    const colorFilterTimeData = document.querySelector('#nav-length .nav-sub .select-nav').dataset.time;
    const colorSortBtn = document.querySelector('#nav-sort .nav-sub .select-nav');
    const hasColorSortBtn = document.getElementById('nav-sort').contains(colorSortBtn);

    removeBeforeFilterVideo ();

    if (hasColorSortBtn) {
        colorSortBtn.classList.remove('select-nav');
        e.target.classList.add('select-nav');
    }

    // 根據排序的選項來篩選影片
    var sortDataWithType = videoData.data.sort(function(last, next) {
        return last[sortDataType] - next[sortDataType];
    });

    // 根據影片長度的選項來篩選影片
    if (colorFilterTimeData === 'fourMinutes') {
        const fourMinutesVideo = sortDataWithType.filter(function(video) {
            return video.duration <= 240;
        });
        loadVideo(fourMinutesVideo);
    } else if (colorFilterTimeData === 'fiveToTenMinutes') {
        const fiveToTenMinutes = sortDataWithType.filter(function(video) {
            return video.duration >= 300 && video.duration < 600;
        });
        loadVideo(fiveToTenMinutes);
    } else if (colorFilterTimeData === 'moreTenMinutes') {
        const moreTenMinutes = sortDataWithType.filter(function(video) {
            return video.duration > 600;
        });
        loadVideo(moreTenMinutes);
    } else {
        loadVideo(sortDataWithType);
    }
});

/************** 點選長度的篩選 ***************/
document.getElementById('nav-length').addEventListener('click', function(e) {
    const videoTimeType = e.target.dataset.time;
    const colorSortBtnData = document.querySelector('#nav-sort .nav-sub .select-nav').dataset.sort;
    const colorFilterTime = document.querySelector('#nav-length .nav-sub .select-nav');
    const hasColorTimeBtn = document.getElementById('nav-length').contains(colorFilterTime);

    // 根據排序的選項來篩選影片
    const sortData = videoData.data.sort(function(last, next) {
        return last[colorSortBtnData] - next[colorSortBtnData];
    });

    if (hasColorTimeBtn) {
        colorFilterTime.classList.remove('select-nav');
        e.target.classList.add('select-nav');
    }
    removeBeforeFilterVideo ();

    // 根據影片長度的選項來篩選影片
    if (videoTimeType === 'fourMinutes') {
        const fourMinutesVideo = sortData.filter(function(video){
            return video.duration <= 240;
        });
        loadVideo(fourMinutesVideo);
    } else if (videoTimeType === 'fiveToTenMinutes') {
        const fiveToTenMinutes = sortData.filter(function(video){
            return video.duration >= 300 && video.duration < 600;
        });
        loadVideo(fiveToTenMinutes);
    } else if (videoTimeType === 'moreTenMinutes') {
        const moreTenMinutes = sortData.filter(function(video){
            return video.duration > 600;
        });
        loadVideo(moreTenMinutes);
    } else {
        loadVideo(sortData);
    }

});

