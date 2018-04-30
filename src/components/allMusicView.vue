<template>
  <div class="page-loadmore">
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore 
        :autoFill="false"
        :top-method="loadTop" 
        :bottom-method="loadBottom" 
        :bottom-all-loaded="allLoaded"
        @translate-change="translateChange" 
        @top-status-change="handleTopChange" 
        @bottom-status-change="handleBottomChange" ref="loadmore">

        <ul class="page-loadmore-list">
          <li v-for="page in pageList" class="page-loadmore-listitem">
            <div class="item-pic"><img :src="page.picUrl" alt=""></div>
          </li>
        </ul>

        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" 
            :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>

        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" 
            :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script type="text/babel">
  import axios from 'axios'
  import { personalized } from '../config/api'
  
  export default {
    data() {
      return {
        list: [],
        pageList: null,
        pageNo: 1,  
        pageSize: 10, 
        allLoaded: false,
        bottomStatus: "",
        wrapperHeight: 0,
        topStatus: "",
        translate: 0,
        moveTranslate: 0
      };
    },
    methods: {
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      // 上拉执行
      loadBottom() {
        setTimeout(() => {
          axios.get(personalized).then(res => {
            let num = res.data.result.length / this.pageSize;
            if (this.pageNo >= num) {
              this.allLoaded = true;
            } else {
              axios.get(personalized).then(res => {
                let data = res.data.result.slice(this.pageSize * this.pageNo, this.pageSize * (this.pageNo + 1));
                this.pageList = this.pageList.concat(data);
                this.pageNo++;
              })
            }
          })
          this.$refs.loadmore.onBottomLoaded();
        }, 1500)
      },
      handleTopChange(status) {
        this.moveTranslate = 1;
        this.topStatus = status;
      },
      translateChange(translate) {
        const translateNum =+ translate;
        this.translate = translateNum.toFixed(2);
        this.moveTranslate = (1 + translateNum / 70).toFixed(2);
      },
      // 下拉执行
      loadTop() {
        setTimeout(() => {
          this.getList();
          this.$refs.loadmore.onTopLoaded();
        }, 1500);
      },
      getList() {
        axios.get(personalized).then(res => {
          this.pageList = res.data.result.slice(0, this.pageSize);
        });
        this.pageNo = 1;
        this.allLoaded = false;
      }
    },
    mounted() {
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper.getBoundingClientRect().top;
      this.getList();
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../common/css/rem';

  .page-loadmore
    width 100%
    margin 0 auto
    padding (f-rem(95px)rem) (f-rem(15px)rem) (f-rem(15px)rem) (f-rem(15px)rem)
    box-sizing border-box
    display flex
    flex-flow row wrap
    justify-content center
    .page-loadmore-wrapper
      overflow scroll
      .loading-background,
      .mint-loadmore-top span
        -webkit-transition 0.2s linear
        transition 0.2s linear
      .mint-loadmore-top span
        display inline-block
        vertical-align middle
      .mint-loadmore-top span.is-rotate
        -webkit-transform rotate(180deg)
        transform rotate(180deg)
      .page-loadmore .mint-spinner
        display inline-block
        vertical-align middle
      .page-loadmore-desc
        text-align center
        color #666
        padding-bottom 5px
      .page-loadmore-desc:last-of-type,
      .page-loadmore-listitem
        border-bottom 1px solid #eee
        display inline-flex
        width 50%
        flex 1 1 auto
        padding f-rem(15px)rem
        box-sizing border-box
        .item-pic
          width 100%
          padding: f-rem(10px)rem;
          border: 1px solid #ccc;
          box-sizing border-box
          img 
            width 100%
            display inline-block
            float left
      .page-loadmore-listitem:first-child
        border-top 1px solid #eee
      .page-loadmore-wrapper
        overflow scroll
      .mint-loadmore-bottom span
        display inline-block
        -webkit-transition 0.2s linear
        transition 0.2s linear
        vertical-align middle
      .mint-loadmore-bottom span.is-rotate
        -webkit-transform rotate(180deg)
        transform rotate(180deg)
</style>