(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{581:function(n,e,o){"use strict";o.r(e),e.default="const {Scene} = spritejs;\nconst {Cube, shaders} = spritejs.ext3d;\n\nconst container = document.getElementById('container');\nconst scene = new Scene({container});\nconst layer = scene.layer3d('fglayer', {\n  camera: {\n    fov: 35, // \u76f8\u673a\u7684\u89c6\u91ce\n    pos: [3, 3, 5], // \u76f8\u673a\u7684\u4f4d\u7f6e\n  },\n});\n\nconst vertex = `\nprecision highp float;\nprecision highp int;\n\nattribute vec3 position;\nattribute vec3 normal;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\n\nvarying vec3 vNormal;\n\nvoid main() {\n    vNormal = normalize(normal);\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n`;\n\nconst fragment = `\nprecision highp float;\nprecision highp int;\n\nvarying vec3 vNormal;\n\nhighp float noise(vec3 p) {\n  vec3 i = floor(p);\n  vec4 a = dot(i, vec3(1.0, 57.0, 21.0)) + vec4(0.0, 57.0, 21.0, 78.0);\n  vec3 f = cos((p - i) * acos(-1.0)) * (-0.5) + 0.5;\n  a = mix(sin(cos(a) * a), sin(cos(1.0 + a) * (1.0 + a)), f.x);\n  a.xy = mix(a.xz, a.yw, f.y);\n  return mix(a.x, a.y, f.z);\n}\n\n//  Function from I\xf1igo Quiles\n//  https://www.shadertoy.com/view/MsS3Wc\nvec3 hsb2rgb(vec3 c){\n  vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0);\n  rgb = rgb * rgb * (3.0 - 2.0 * rgb);\n  return c.z * mix(vec3(1.0), rgb, c.y);\n}\n\nuniform float uTime;\n\nvoid main() {\n  vec3 normal = vNormal * uTime;\n  gl_FragColor.rgb = hsb2rgb(vec3(noise(normal), 0.5, 0.5));\n  gl_FragColor.a = 1.0;\n}\n`;\n\nconst program = layer.createProgram({\n  vertex,\n  fragment,\n  cullFace: null,\n}, {\n  uniforms: {\n    uTime: {value: 0},\n  },\n});\n\nconst cube = new Cube(program);\nlayer.append(cube);\n\nlayer.bindTime(program, {playbackRate: 0.2});\n\nlayer.setOrbit(); // \u5f00\u542f\u65cb\u8f6c\u63a7\u5236"}}]);