<template>
  <div :style="{ 'background-image': `url(${basemap})` }" class="browser-content" @dragenter="dragenter" @dragover="dragover">
    <div @click="removeLayout" data-layout="toolbar|top" @drop="onDropZone" @dragenter="dragenterZone" @dragleave="dragleaveZone" :style="topToolbarStyle" class="browser-contentElement"></div>
    <div @click="removeLayout" data-layout="toolbar|left" @drop="onDropZone" @dragenter="dragenterZone" @dragleave="dragleaveZone" :style="leftToolbarStyle" class="browser-contentElement"></div>
    <div @click="removeLayout" data-layout="toolbar|right" @drop="onDropZone" @dragenter="dragenterZone" @dragleave="dragleaveZone" :style="rightToolbarStyle" class="browser-contentElement"></div>
    <div @click="removeLayout" data-layout="sidebars|left" @drop="onDropZone" @dragenter="dragenterZone" @dragleave="dragleaveZone" :style="leftSidebarStyle" class="browser-contentElement"></div>
    <div @click="removeLayout" data-layout="sidebars|right" @drop="onDropZone" @dragenter="dragenterZone" @dragleave="dragleaveZone" :style="rightSidebarStyle" class="browser-contentElement"></div>
    <div @click="removeLayout" data-layout="footer" @drop="onDropZone" @dragenter="dragenterZone" @dragleave="dragleaveZone" :style="footerStyle" class="browser-contentElement"></div>
    <div @click="removeLayout" data-layout="panels|top|left" @drop="onDropZone" @dragenter="dragenterZone" @dragleave="dragleaveZone" :style="topLeftPanelStyle" class="browser-contentElement"></div>
    <div @click="removeLayout" data-layout="panels|top|right" @drop="onDropZone" @dragenter="dragenterZone" @dragleave="dragleaveZone" :style="topRightPanelStyle" class="browser-contentElement"></div>
    <div @click="removeLayout" data-layout="panels|bottom|left" @drop="onDropZone" @dragenter="dragenterZone" @dragleave="dragleaveZone" :style="bottomLeftPanelStyle" class="browser-contentElement"></div>
    <div @click="removeLayout" data-layout="panels|bottom|right" @drop="onDropZone" @dragenter="dragenterZone" @dragleave="dragleaveZone" :style="bottomRightPanelStyle" class="browser-contentElement"></div>
  </div>
</template>

<script>
const TOOLBAR_SIZE = 50;
const SIDEBAR_SIZE = 100;
const PANEL_SIZE = 80;
const PANEL_MARGIN = 16;
const FOOTER_SIZE = 100;

export default {
  name: 'BrowserDrop',
  props: {
    draggingElement: String,
    basemap: String
  },
  methods: {
    isSelected(element, position) {
      const layoutElement = this.$store.state.layout[element];

      if (Array.isArray(layoutElement)) {
        if (element === 'panels') {
          return layoutElement.some(panel => panel.horizontalPosition === position[1] && panel.verticalPosition === position[0]);
        }

        return layoutElement.some(element => element.position === position[0]);
      }

      if (element === 'footer') {
        return layoutElement !== null;
      }

      return layoutElement.position === position[0];
    },
    dragenter(e) {
      e.preventDefault();
    },
    dragover(e) {
      e.preventDefault();
    },
    dragenterZone(e) {
      /* color hover */
      e.target.style['backgroundColor'] = '#fabada';
      e.target.style['transform'] = 'scale(.95)';
    },
    dragleaveZone(e) {
      const [element, ...position] = e.target.dataset.layout.split('|');
      e.target.style['transform'] = 'scale(1)';
      // Don't unset if already selected
      if (!this.isSelected(element, position)) {
        e.target.style['backgroundColor'] = null;
      }
    },
    onDropZone(e) {
      const [element, ...position] = (e.target.dataset.layout || e.target.parentElement.dataset.layout).split('|');
      e.target.style['transform'] = 'scale(1)';

      // HAAAAAAAAAAAX
      if (e.target.style.opacity === '0') {
        return;
      }

      const elementObject = this.$store.state.layout[element];

      if (Array.isArray(elementObject)) {
        if (element === 'panels') {
          elementObject.push({ horizontalPosition: position[1], verticalPosition: position[0] });
          return;
        }

        elementObject.push({ position: position[0] });
        return;
      }

      this.$store.state.layout[element] = { position: position[0] };
    },
    drop(event) {
      console.log({ event }, arguments);
    },
    styleForPanel (h, v) {
      const itemSet = this.$store.state.layout.panels.some(panel => panel.horizontalPosition === h && panel.verticalPosition === v);

      if (itemSet) {
        return {
          opacity: this.draggingElement === null ? 1 : 1,
          backgroundColor: 'rgba(255, 255, 255, .8)'
        };
      }

      return {
        opacity: this.draggingElement === 'panel' ? 1 : 0
      };
    },
    panelStyle(h, v) {
      const style = this.styleForPanel(h, v);

      let hOffset = 0;

      if (this.$store.state.layout.toolbar.position === h || this.draggingElement === 'lateralToolbar') {
        hOffset += TOOLBAR_SIZE;
      }

      const hasSidebarLeft = this.$store.state.layout.sidebars.some(sidebar => sidebar.position === h);
      if (hasSidebarLeft || this.draggingElement === 'sidebar') {
        hOffset += SIDEBAR_SIZE;
      }

      let vOffset = 0;

      if ((v === 'top' && this.$store.state.layout.toolbar.position === 'top') || (v === 'top' && this.draggingElement === 'topToolbar')) {
        vOffset += TOOLBAR_SIZE;
      }

      if ((v === 'bottom' && this.$store.state.layout.footer) || (v === 'bottom' && this.draggingElement === 'footer')) {
        vOffset += FOOTER_SIZE;
      }

      style[h] = `${hOffset + PANEL_MARGIN}px`;
      style[v] = `${vOffset + PANEL_MARGIN}px`;
      style['width'] = `${PANEL_SIZE}px`;
      style['height'] = `${PANEL_SIZE}px`;

      return style;
    },

    removeLayout: function (e) {
      const [element, ...position] = e.target.dataset.layout.split('|');

      if (element === 'footer') {
        this.$store.state.layout.footer = null;
        return;
      }

      if (element === 'panels') {
        this.$store.state.layout.panels = this.$store.state.layout.panels.filter(panel => !(panel.verticalPosition === position[0] && panel.horizontalPosition === position[1]))
        return;
      }

      if (element === 'sidebars') {
        this.$store.state.layout.sidebars = this.$store.state.layout.sidebars.filter(sidebar => !(sidebar.position === position[0]));
        return;
      }

      if (position[0] === this.$store.state.layout.toolbar.position) {
        this.$store.state.layout.toolbar = {};
      }

    }
  },
  computed: {
    topToolbarStyle() {
      const style = {
      };

      if (this.$store.state.layout.toolbar.position && this.$store.state.layout.toolbar.position === 'top') {
        style['opacity'] = this.draggingElement === null ? 1 : 1;
        style['backgroundColor'] = 'rgba(242, 220, 93, .8)';
      } else {
        style['opacity'] = this.draggingElement === 'topToolbar' ? 1 : 0;
      }

      style['left'] = 0;
      style['right'] = 0;
      style['top'] = 0;
      style['height'] = `${TOOLBAR_SIZE}px`;

      return style;
    },
    leftToolbarStyle() {
      const style = {
      };

      if (this.$store.state.layout.toolbar.position && this.$store.state.layout.toolbar.position === 'left') {
        style['opacity'] = this.draggingElement === null ? 1 : 1;
        style['backgroundColor'] = 'rgba(242, 220, 93, .8)';
      } else {
        style['opacity'] = this.draggingElement === 'lateralToolbar' ? 1 : 0;
      }

      style['left'] = 0;
      style['top'] = 0;
      style['bottom'] = 0;
      style['width'] = `${TOOLBAR_SIZE}px`;

      return style;
    },
    rightToolbarStyle() {
      const style = {
      };

      if (this.$store.state.layout.toolbar.position && this.$store.state.layout.toolbar.position === 'right') {
        style['opacity'] = this.draggingElement === null ? 1 : 0.2;
        style['backgroundColor'] = 'rgba(242, 220, 93, 0.8) ';
      } else {
        style['opacity'] = this.draggingElement === 'lateralToolbar' ? 1 : 0;
      }

      style['top'] = 0;
      style['right'] = 0;
      style['bottom'] = 0;
      style['width'] = `${TOOLBAR_SIZE}px`;

      return style;
    },
    leftSidebarStyle() {
      const hasLeftSidebar = this.$store.state.layout.sidebars.some(sidebar => sidebar.position === 'left');
      const style = {
      };

      if (hasLeftSidebar) {
        style['opacity'] = this.draggingElement === null ? 1 : 1;
        style['backgroundColor'] = 'rgba(255, 255, 255, 0.8) ';
      } else {
        style['opacity'] = this.draggingElement === 'sidebar' ? 1 : 0;
      }

      style['top'] = (this.$store.state.layout.toolbar.position === 'top' || this.draggingElement === 'topToolbar') ? `${TOOLBAR_SIZE}px` : 0;
      style['left'] = (this.$store.state.layout.toolbar.position === 'left'  || this.draggingElement === 'lateralToolbar') ? `${TOOLBAR_SIZE}px` : 0;
      style['bottom'] = 0;
      style['width'] = `${SIDEBAR_SIZE}px`;

      return style;
    },
    rightSidebarStyle() {
      const hasRightSidebar = this.$store.state.layout.sidebars.some(sidebar => sidebar.position === 'right');
      const style = {
      };

      if (hasRightSidebar) {
        style['opacity'] = this.draggingElement === null ? 1 : 1;
        style['backgroundColor'] = 'rgba(255,255,255,0.8)';
      } else {
        style['opacity'] = this.draggingElement === 'sidebar' ? 1 : 0;
      }

      style['top'] = (this.$store.state.layout.toolbar.position === 'top' || this.draggingElement === 'topToolbar') ? `${TOOLBAR_SIZE}px` : 0;
      style['right'] = (this.$store.state.layout.toolbar.position === 'right' || this.draggingElement === 'lateralToolbar') ? `${TOOLBAR_SIZE}px` : 0;
      style['bottom'] = 0;
      style['width'] = `${SIDEBAR_SIZE}px`;

      return style;
    },
    footerStyle() {
      const style = {
      };

      if (this.$store.state.layout.footer !== null) {
        style['opacity'] = this.draggingElement === null ? 1 : 1;
        style['backgroundColor'] = 'rgba(255,255,255,1)';
      } else {
        style['opacity'] = this.draggingElement === 'footer' ? 1 : 0;
      }

      let leftOffset = 0;

      if (this.$store.state.layout.toolbar.position === 'left' || this.draggingElement === 'lateralToolbar') {
        leftOffset += TOOLBAR_SIZE;
      }

      const hasSidebarLeft = this.$store.state.layout.sidebars.some(sidebar => sidebar.position === 'left');
      if (hasSidebarLeft || this.draggingElement === 'sidebar') {
        leftOffset += SIDEBAR_SIZE;
      }

      let rightOffset = 0;
      if (this.$store.state.layout.toolbar.position === 'right' || this.$store.state.layout.draggingElement === 'lateralToolbar') {
        rightOffset += TOOLBAR_SIZE;
      }

      const hasSidebarRight = this.$store.state.layout.sidebars.some(sidebar => sidebar.position === 'right');
      if (hasSidebarRight || this.draggingElement === 'sidebar') {
        rightOffset += SIDEBAR_SIZE;
      }

      style['left'] = `${leftOffset}px`;
      style['right'] = `${rightOffset}px`;
      style['bottom'] = 0;
      style['height'] = `${SIDEBAR_SIZE}px`;

      return style;
    },
    topLeftPanelStyle() {
      return this.panelStyle('left', 'top');
    },
    topRightPanelStyle() {
      return this.panelStyle('right', 'top');
    },
    bottomLeftPanelStyle() {
      return this.panelStyle('left', 'bottom');
    },
    bottomRightPanelStyle() {
      return this.panelStyle('right', 'bottom');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.browser-content {
  position: relative;
  background: #F3F5F5;
  height: 500px;
  background-size: cover;
  transition: background-image 0.2s linear;
}

.browser-contentElement {
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  transition: opacity 0.2s linear, background-color 0.2s linear, left 0.2s linear, right 0.2s linear, top 0.2s linear, bottom 0.2s linear;
  opacity: 0;
}

    .browser-contentElement--lateralToolbar-left {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 52px;
    }
    .browser-contentElement--lateralToolbar-right {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 52px;
    }
    .browser-contentElement--topToolbar {
      position: absolute;
      left: 0;
      top: 0;
      height: 52px;
      right: 0;
    }
    .browser-contentElement--sideBar--left {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 100px;
    }
    .browser-contentElement--sideBar--right {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100px;
    }
    .browser-contentElement--footer {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 100px;
      right: 0;
    }
    .browser-contentElement--panelTopLeft {
      position: absolute;
      left: 0;
      top: 0;
      width: 80px;
      height: 80px;
    }
    .browser-contentElement--panelTopRight {
      position: absolute;
      right: 0;
      top: 0;
      width: 80px;
      height: 80px;
    }
    .browser-contentElement--panelBottomLeft {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 80px;
      height: 80px;
    }
    .browser-contentElement--panelBottomRight {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 80px;
      height: 80px;
    }

    .browser-contentElement:hover::after {
      content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAYAAACdkl3yAAAAAXNSR0IArs4c6QAAAIdJREFUOBFjZMAN/uOQYsQmzoRNkBwxkOm4bCbJPKq5iCRb8SlGDjhyvQg2g2peY8HiXGRXYpGGC6H4gGouwmcQyEZkW9H5cKeBGPgMQlFIiDNqEKEQYmDAlo5gutDTEzofpg5M0ySwn0CtgKUXQjRIOUwPVCuE8gRSj4GYkAEweZBakB4wAAAQlyAt9W5bLQAAAABJRU5ErkJggg==');
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-weight: bold;
      cursor: pointer;
    }

    .browser-contentElement .remove {
      font-size: 64px;
      pointer-events: none;
    }
</style>
