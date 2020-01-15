(window.webpackJsonp=window.webpackJsonp||[]).push([[110],{595:function(n,t,e){"use strict";e.r(t),t.default="const container = document.getElementById('paper');\nconst spriteCount = document.getElementById('spriteCount');\nconst drawCalls = document.getElementById('drawCalls');\n\n/* globals Animator */\nconst scene = new spritejs.Scene({container, width: 800, height: 800});\n\nconst bglayer = scene.layer('bg'), // \u80cc\u666f\u5c42\n  // \u524d\u666f\u5c42\n  // \u4e0d\u4ee3\u7406\u4e8b\u4ef6\uff0c\u63d0\u5347\u6027\u80fd\n  fglayer = scene.layer('fg', {\n    handleEvent: false,\n    bufferSize: 12000,\n  });\n\nconst axisZero = [400, 400];\nconst circle = new spritejs.Block();\n\ncircle.attr({\n  anchor: [0.5, 0.5],\n  size: [800, 800],\n  pos: axisZero,\n  bgcolor: '#139',\n  opacity: 0.5,\n  borderRadius: 400,\n});\n\nbglayer.appendChild(circle);\n\nfunction pointAdd(p1, p2 = [0, 0]) {\n  return [p1[0] + p2[0], p1[1] + p2[1]].map(Math.round);\n}\n\nfunction pointSub(p1, p2 = [0, 0]) {\n  return [p1[0] - p2[0], p1[1] - p2[1]].map(Math.round);\n}\n\nfunction sleep(time) {\n  return new Promise(resolve => setTimeout(resolve, time));\n}\n\nasync function randomAnimate(sprite) {\n  const fromPoint = sprite.attr('pos');\n  const randomArc = Math.random() * 2 * Math.PI;\n  const randomPoint = pointAdd([350 * Math.cos(randomArc), 350 * Math.sin(randomArc)], axisZero);\n\n  const dist = pointSub(randomPoint, fromPoint);\n  const distance = Math.round(Math.sqrt(dist[0] * dist[0] + dist[1] * dist[1]));\n  const duration = 5 * distance + 100;\n\n  const anim = new Animator(duration, (p) => {\n    const pos = pointAdd(fromPoint, [p * dist[0], p * dist[1]]);\n    const rotate = p * 720;\n    // sprite.forceUpdate()\n    sprite.attr({\n      pos,\n      rotate,\n    });\n  });\n\n  await anim.animate();\n  await sleep(500);\n}\n\nlet _spriteCount = 0;\nasync function addSprite() {\n  _spriteCount++;\n  spriteCount.innerHTML = _spriteCount * 5;\n  const group = new spritejs.Group();\n  group.attr({\n    anchor: [0.5, 0.5],\n    pos: axisZero,\n    size: [60, 60],\n    bgcolor: 'white',\n    // bgcolor: 'white',\n  });\n\n  const center = new spritejs.Block();\n  center.attr({\n    anchor: [0.5, 0.5],\n    pos: [0, 0],\n    size: [20, 20],\n    borderRadius: 10,\n    bgcolor: 'black',\n  });\n\n  const top = center.cloneNode();\n  top.attr({\n    pos: [0, -20],\n  });\n\n  const right = center.cloneNode();\n  right.attr({\n    pos: [20, 0],\n  });\n\n  const bottom = center.cloneNode();\n  bottom.attr({\n    pos: [0, 20],\n  });\n\n  const left = center.cloneNode();\n  left.attr({\n    pos: [-20, 0],\n  });\n\n  group.append(center, top, right, bottom, left);\n  group.seal();\n\n  fglayer.appendChild(group);\n\n  // noprotect\n  do {\n    await randomAnimate(group); // eslint-disable-line no-await-in-loop\n  } while(1);\n}\n\nrequestAnimationFrame(function f() {\n  if(_spriteCount < 500) {\n    addSprite();\n    requestAnimationFrame(f);\n  }\n});\n\nsetInterval(() => {\n  // console.log('tick');\n  drawCalls.innerHTML = fglayer.renderer._drawCalls;\n}, 100);"}}]);