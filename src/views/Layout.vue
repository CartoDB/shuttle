<template>
  <div>
    <div class="browser">
      <div class="browser-header">
        <span class="browser-headerPoint browser-headerPoint--red"></span>
        <span class="browser-headerPoint browser-headerPoint--yellow"></span>
        <span class="browser-headerPoint browser-headerPoint--green"></span>
      </div>
      <div class="browser-inner">
        <div class="browser-bar">
          <div class="browser-barAddress">http://www.airsephora.es<span></span></div>
        </div>
        <div class="browser-content">
        </div>

      </div>
    </div>
  </div>
</template>


<style scoped>
.browser {
  max-width: 880px;
  width: 100%;
}
  .browser-header {
    background: #E8EAED;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    height: 38px;
    display: flex;
    padding: 14px;
    position: relative;
    z-index: 1;
  }
  .browser-headerPoint {
    border-radius: 50%;
    height: 8px;
    width: 8px;
    margin-right: 8px;
  }
    .browser-headerPoint--red {
      background: #FF6159;
    }
    .browser-headerPoint--yellow {
      background: #FFBD2D;
    }
    .browser-headerPoint--green {
      background: #29C940;
    }

  .browser-bar {
    padding: 5px;
  }
  .browser-inner {
    position: relative;
  }
  .browser-inner:after {
    content: '';
    position: absolute;
    top: -2px;
    right: 0;
    bottom: 0;
    left: 0;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
  .browser-content {
    position: relative;
    background: #F3F5F5;
    height: 500px;
  }
  .browser-barAddress {
    background: #F1F3F4;
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 10px;
    color: rgba(0, 0, 0, 0.6);
  }

    .browser-barAddress span { 
      animation-name: blinker;
      animation-iteration-count: infinite;
      animation-timing-function: cubic-bezier(1,0,0,1);
      animation-duration: .8s;
      display: inline-block;
      width: 1px;
      height: 12px;
      background: rgba(0, 0, 0, .4);
      vertical-align: middle;
      transform: translateY(0px) translateX(-1px);
      margin-left: 4px;
    }

    @keyframes blinker { 
      from { opacity: 1.0; } to { opacity: 0.0; }
    }

</style>