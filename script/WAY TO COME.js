var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
//교통정보를 보게하는 버튼
const t_on = document.querySelectorAll(".traffic li")[0];
//교통정보를 끄게하는 버튼
const t_off = document.querySelectorAll(".traffic li")[1];

//branch버튼 
const branch_btns = document.querySelectorAll(".branch li");


var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.4868352, 126.7830001), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

//객체배열에는 각 마커의 이미지경로, 크기, 위치, 이름, 위도경도,
//마커와 매치할 버튼의 인덱스등의 정보를 담을것
var markerOptions = [{
    title : "본점",
    latlng : new kakao.maps.LatLng(37.4868352, 126.7830001),
    imgSrc : "img/marker1.png",
    imgSize : new kakao.maps.Size(232, 99),
    imgPos : {offset: new kakao.maps.Point(116, 69)},
    button : branch_btns[0]
},{
    title : "지점1",
    latlng : new kakao.maps.LatLng(37.579617, 126.977041),
    imgSrc : "img/marker2.png",
    imgSize : new kakao.maps.Size(232, 99),
    imgPos : {offset: new kakao.maps.Point(116, 69)},
    button : branch_btns[1]
},{
    title : "지점2",
    latlng : new kakao.maps.LatLng(36.3727807, 127.3536125),
    imgSrc : "img/marker3.png",
    imgSize : new kakao.maps.Size(232, 99),
    imgPos : {offset: new kakao.maps.Point(116, 69)},
    button : branch_btns[2]
}]


for (let i = 0; i < markerOptions.length; i++){
    new kakao.maps.Marker({
        map : map,  //앞에 map은 Marker라는 매소드의 프로퍼티이고
        //뒤에 map은 위에서 지도를 생성하는 메소드를 변수에 넣은 값
        position : markerOptions[i].latlng,
        //지도의 위치 즉 위도경도값을 객체변수에서 가지고옵니다
        title : markerOptions[i].title,
        image : new kakao.maps.MarkerImage(markerOptions[i].imgSrc,
             markerOptions[i].imgSize, markerOptions[i].imgPos)
    })
    // branch_btns[2]
    markerOptions[i].button.addEventListener("click",(e)=>{
        e.preventDefault();
        for(let k =0; k<markerOptions.length; k++){
            markerOptions[k].button.classList.remove("on");
        }
        markerOptions[i].button.classList.add("on");

        map.setCenter(markerOptions[i].latlng);

    })
}

t_on.addEventListener("click",(e)=>{
    e.preventDefault();
    // 지도에 교통정보를 표시하도록 지도타입을 추가합니다

    //조건문으로 on클래스가 있는지 없는지를 판별해서
    //있으면 return으로 이벤트를 막아줍니다
    if(t_on.classList.contains("on")) return;

map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);  

t_on.classList.add("on");
t_off.classList.remove("on");   
})

t_off.addEventListener("click",(e)=>{
    e.preventDefault();
    if(t_off.classList.contains("on")) return;
    // 아래 코드는 위에서 추가한 교통정보 지도타입을 제거합니다
map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); 
t_off.classList.add("on");
t_on.classList.remove("on");
})


// var imageSrc = 'img/marker1.png', // 마커이미지의 주소입니다    
//     imageSize = new kakao.maps.Size(232, 99), // 마커이미지의 크기입니다
//     imageOption = {offset: new kakao.maps.Point(116, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      
// // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
// var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
//     markerPosition = new kakao.maps.LatLng(37.4868352, 126.7830001); // 마커가 표시될 위치입니다

// // 마커를 생성합니다
// var marker = new kakao.maps.Marker({
//     position: markerPosition, 
//     image: markerImage // 마커이미지 설정 
// });

// 마커가 지도 위에 표시되도록 설정합니다
// marker.setMap(map);  

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOMRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);