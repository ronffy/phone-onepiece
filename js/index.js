/**
** hzw
** 2016.03.20
** by whr
**/
$(function(){
	var indexFn = {
		valiable:{
			btn_nav:$("#btn-right-nav"), //右上角nav按钮
			btn_audio:$(".js-btn-audio"), //音乐开关按钮
			src_music : "i.icon-btn-music", // 音乐图标
			opacity_bg: $(".con-opacity-bg"), //打开nav后出现的透明背景层
			right_nav_con:$(".right-nav"), //隐藏的右侧nav容器
			index_con:$(".index-con"), //主页面
			big_bannerswiper:".banner-swiper01", //大banner的容器
			sm_bannerswiper:".banner-swiper02" //小banner的容器
		},
		init:function(){
			this.openNav(); // 点击内容右上角按钮，nav出现
			this.closeNav(); // 向右滑动nav或者屏幕任何位置，关闭nav
			this.btnAudio(); // 音乐开关
			this.bannerSwiper(); //banner初始化初始化轮播效果
			this.smbgSwiper(); // 小背景图浮动
			this.tabCss3(); //tab的css3效果
		},
		openNav:function(){
			var valiable = indexFn.valiable;
			valiable.btn_nav.tap(function(){
				$(this).add(valiable.opacity_bg).add(valiable.right_nav_con).add(valiable.index_con).toggleClass("active");
				$("body").toggleClass("showNav");
			});
		},
		btnAudio:function(){
			var valiable = indexFn.valiable,
				src_music = valiable.src_music;
			valiable.btn_audio.tap(function(){
				$(this).find(src_music).toggleClass("active");
				var audio = $("#jsAudio")[0];
				var btnSwitch = $(this).attr("data-switch");
				if(btnSwitch == "close"){
					$(this).attr("data-switch","open");
					audio.play();
					$(this).find(src_music).addClass("active");
				}else{
					$(this).attr("data-switch","close");
					audio.pause();
					$(this).find(src_music).removeClass("active");
				}
			});
		},
		closeNav:function(){
			var valiable = indexFn.valiable;
			valiable.opacity_bg.add(valiable.right_nav_con).on("swipeRight",function(){
				valiable.btn_nav.add(valiable.opacity_bg).add(valiable.right_nav_con).add(valiable.index_con).removeClass("active");
				$("body").removeClass("showNav");
			});
		},
		bannerSwiper:function(){
			var bannerSwiper01 = new Swiper(indexFn.valiable.big_bannerswiper,{
				speed:1000,
				loop:true, 
				loopedSlides: 6,
				// autoplay:2000,
				effect:"slide",
				centeredSlides: true,
			});
			var bannerSwiper02 = new Swiper(indexFn.valiable.sm_bannerswiper,{
				speed:1000,
				loop:true, 
				loopedSlides: 6,
				// autoplay:2000,
				spaceBetween: 10,
				slidesPerView: 4,
				touchRatio: 0.2,
				slideToClickedSlide: true,
				// 加上此参数，当前小幻灯片居中，不加的话，小幻灯片在最左边
				centeredSlides: true,
			});
			bannerSwiper01.params.control = bannerSwiper02;
			bannerSwiper02.params.control = bannerSwiper01;
		},
		smbgSwiper:function(){
			new Swiper(".bgslide-container",{
				scrollbar: '.swiper-scrollbar',
				scrollbarHide: false,
				// autoplay:2000,
				parallax:true,
				speed: 600
			});
		},
		tabCss3:function(){
			var tabsSwiper = new Swiper(".index-tab .tabs-container",{
				speed:500,
				onInit: function(swiper){
					swiperAnimateCache(swiper);
					swiperAnimate(swiper);
				},
				onSlideChangeEnd: function(swiper){
					swiperAnimate(swiper);
				},
				onSlideChangeStart: function(){
					$(".index-tab .tabs .active").removeClass('active')
					$(".index-tab .tabs a").eq(tabsSwiper.activeIndex).addClass('active')  
				}	  
			});
			$(".index-tab .tabs a").on('touchstart mousedown',function(e){
			  e.preventDefault()
			  $(".index-tab .tabs .active").removeClass('active')
			  $(this).addClass('active')
			  tabsSwiper.slideTo( $(this).index() )
			});
			$(".index-tab .tabs a").tap(function(e){
			  e.preventDefault()
			});
		}
	};
	indexFn.init();
});