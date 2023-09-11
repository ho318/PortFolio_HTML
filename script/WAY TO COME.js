var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
//교통정보를 보게하는 버튼
const t_on = document.querySelectorAll(".traffic li")[0];
//교통정보를 끄게하는 버튼
const t_off = document.querySelectorAll(".traffic li")[1];

var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.5077011, 127.0620054), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

// 마커가 표시될 위치입니다 
var markerPosition  = new kakao.maps.LatLng(37.5077011, 127.0620054); 

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

// 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
var iwContent = '<div class="markers" style="padding:30px;">서울 강남구 테헤란로98길 8, 14층<br><a href="https://map.kakao.com/link/map/서울 강남구 테헤란로98길 8 14층,37.5077011,127.0620054" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/서울 강남구 테헤란로98길 8 14층,37.5077011, 127.0620054" style="color:blue" target="_blank">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

// 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({
    content : iwContent,
    removable : iwRemoveable
});

// 마커에 클릭이벤트를 등록합니다
kakao.maps.event.addListener(marker, 'click', function() {
      // 마커 위에 인포윈도우를 표시합니다
      infowindow.open(map, marker);  
});


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

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOMRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);