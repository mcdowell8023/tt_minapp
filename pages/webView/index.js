// const app= getApp()

Page({
  data: {
    icons: [
      ["success", "success_no_circle"],
      ["info", "warn"],
      ["waiting", "clear"],
      ["cancel", "download"],
      ["search"]
    ],
    sizes: [66, 48, 36, 24],
    colors: ["#222222", "#CACACA", "", "#50ABF9"],
    canvasId:'stream_canvas'
  },
  onLoad: function () {
    console.log('Welcome to Mini Code--......')
  },
})
