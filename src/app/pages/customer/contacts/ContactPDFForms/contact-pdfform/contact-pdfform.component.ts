import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-contact-pdfform',
  templateUrl: './contact-pdfform.component.html',
  styleUrls: ['./contact-pdfform.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ContactPDFFormComponent implements OnInit {


  htmlContent = `
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml">

  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <style type="text/css">

    #sidebar {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 250px;
      padding: 0;
      margin: 0;
      overflow: auto
    }

    #page-container {
      position: absolute;
      top: 0;
      left: 0;
      margin: 0;
      padding: 0;
      border: 0
    }

    @media screen {
      #sidebar.opened+#page-container {
        left: 250px
      }
      #page-container {
        bottom: 0;
        right: 0;
        overflow: auto
      }
      .loading-indicator {
        display: none
      }
      .loading-indicator.active {
        display: block;
        position: absolute;
        width: 64px;
        height: 64px;
        top: 50%;
        left: 50%;
        margin-top: -32px;
        margin-left: -32px
      }
      .loading-indicator img {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0
      }
    }

    .pf {
      position: relative;
      background-color: white;
      overflow: hidden;
      margin: 0;
      border: 0
    }

    .pc {
      position: absolute;
      border: 0;
      padding: 0;
      margin: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: block;
      transform-origin: 0 0;
      -ms-transform-origin: 0 0;
      -webkit-transform-origin: 0 0
    }

    .pc.opened {
      display: block
    }

    .bf {
      position: absolute;
      border: 0;
      margin: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      -ms-user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      user-select: none
    }

    .bi {
      position: absolute;
      border: 0;
      margin: 0;
      -ms-user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      user-select: none
    }

    @media print {
      .pf {
        margin: 0;
        box-shadow: none;
        page-break-after: always;
        page-break-inside: avoid
      }
      @-moz-document url-prefix() {
        .pf {
          overflow: visible;
          border: 1px solid #fff
        }
        .pc {
          overflow: visible
        }
      }
    }

    .c {
      position: absolute;
      border: 0;
      padding: 0;
      margin: 0;
      overflow: hidden;
      display: block
    }


          .ct {
              position: absolute;
              white-space: pre;
              font-size: 1px;
              transform-origin: 0 100%;
              -ms-transform-origin: 0 100%;
              -webkit-transform-origin: 0 100%;
              unicode-bidi: bidi-override;
              -moz-font-feature-settings: "liga" 0
          }

              .ct:after {
                  content: ''
              }

              .ct:before {
                  content: '';
                  display: inline-block
              }

              .ct span {
                  position: relative;
                  unicode-bidi: bidi-override
              }



    .t {
      position: absolute;
      white-space: pre;
      font-size: 1px;
      transform-origin: 0 100%;
      -ms-transform-origin: 0 100%;
      -webkit-transform-origin: 0 100%;
      unicode-bidi: bidi-override;
      -moz-font-feature-settings: "liga" 0
    }

    .t:after {
      content: ''
    }

    .t:before {
      content: '';
      display: inline-block
    }

    .t span {
      position: relative;
      unicode-bidi: bidi-override
    }

    ._ {
      display: inline-block;
      color: transparent;
      z-index: -1
    }

    ::selection {
      background: rgba(127, 255, 255, 0.4)
    }

    ::-moz-selection {
      background: rgba(127, 255, 255, 0.4)
    }

    .pi {
      display: none
    }

    .d {
      position: absolute;
      transform-origin: 0 100%;
      -ms-transform-origin: 0 100%;
      -webkit-transform-origin: 0 100%
    }

    .it {
      border: 0;
      background-color: rgba(255, 255, 255, 0.0)
    }

    .ir:hover {
      cursor: pointer
    }
    </style>
    <style type="text/css">

    @keyframes fadein {
      from {
        opacity: 0
      }
      to {
        opacity: 1
      }
    }

    @-webkit-keyframes fadein {
      from {
        opacity: 0
      }
      to {
        opacity: 1
      }
    }

    @keyframes swing {
      0 {
        transform: rotate(0)
      }
      10% {
        transform: rotate(0)
      }
      90% {
        transform: rotate(720deg)
      }
      100% {
        transform: rotate(720deg)
      }
    }

    @-webkit-keyframes swing {
      0 {
        -webkit-transform: rotate(0)
      }
      10% {
        -webkit-transform: rotate(0)
      }
      90% {
        -webkit-transform: rotate(720deg)
      }
      100% {
        -webkit-transform: rotate(720deg)
      }
    }

    @media screen {
      #sidebar {
        background-color: #2f3236;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjNDAzYzNmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMNCA0Wk00IDBMMCA0WiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiMxZTI5MmQiPjwvcGF0aD4KPC9zdmc+")
      }
      #outline {
        font-family: Georgia, Times, "Times New Roman", serif;
        font-size: 13px;
        margin: 2em 1em
      }
      #outline ul {
        padding: 0
      }
      #outline li {
        list-style-type: none;
        margin: 1em 0
      }
      #outline li>ul {
        margin-left: 1em
      }
      #outline a,
      #outline a:visited,
      #outline a:hover,
      #outline a:active {
        line-height: 1.2;
        color: #e8e8e8;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-decoration: none;
        display: block;
        overflow: hidden;
        outline: 0
      }
      #outline a:hover {
        color: #0cf
      }
      #page-container {
        background-color: #9e9e9e;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjOWU5ZTllIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiM4ODgiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=");
        -webkit-transition: left 500ms;
        transition: left 500ms
      }
      .pf {
        margin: 13px auto;
        box-shadow: 1px 1px 3px 1px #333;
        border-collapse: separate
      }
      .pc.opened {
        -webkit-animation: fadein 100ms;
        animation: fadein 100ms
      }
      .loading-indicator.active {
        -webkit-animation: swing 1.5s ease-in-out .01s infinite alternate none;
        animation: swing 1.5s ease-in-out .01s infinite alternate none
      }
      .checked {
        background: no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3goQDSYgDiGofgAAAslJREFUOMvtlM9LFGEYx7/vvOPM6ywuuyPFihWFBUsdNnA6KLIh+QPx4KWExULdHQ/9A9EfUodYmATDYg/iRewQzklFWxcEBcGgEplDkDtI6sw4PzrIbrOuedBb9MALD7zv+3m+z4/3Bf7bZS2bzQIAcrmcMDExcTeXy10DAFVVAQDksgFUVZ1ljD3yfd+0LOuFpmnvVVW9GHhkZAQcxwkNDQ2FSCQyRMgJxnVdy7KstKZpn7nwha6urqqfTqfPBAJAuVymlNLXoigOhfd5nmeiKL5TVTV+lmIKwAOA7u5u6Lped2BsbOwjY6yf4zgQQkAIAcedaPR9H67r3uYBQFEUFItFtLe332lpaVkUBOHK3t5eRtf1DwAwODiIubk5DA8PM8bYW1EU+wEgCIJqsCAIQAiB7/u253k2BQDDMJBKpa4mEon5eDx+UxAESJL0uK2t7XosFlvSdf0QAEmlUnlRFJ9Waho2Qghc1/U9z3uWz+eX+Wr+lL6SZfleEAQIggA8z6OpqSknimIvYyybSCReMsZ6TislhCAIAti2Dc/zejVNWwCAavN8339j27YbTg0AGGM3WltbP4WhlRWq6Q/btrs1TVsYHx+vNgqKoqBUKn2NRqPFxsbGJzzP05puUlpt0ukyOI6z7zjOwNTU1OLo6CgmJyf/gA3DgKIoWF1d/cIY24/FYgOU0pp0z/Ityzo8Pj5OTk9PbwHA+vp6zWghDC+VSiuRSOQgGo32UErJ38CO42wdHR09LBQK3zKZDDY2NupmFmF4R0cHVlZWlmRZ/iVJUn9FeWWcCCE4ODjYtG27Z2Zm5juAOmgdGAB2d3cBADs7O8uSJN2SZfl+WKlpmpumaT6Yn58vn/fs6XmbhmHMNjc3tzDGFI7jYJrm5vb29sDa2trPC/9aiqJUy5pOp4f6+vqeJ5PJBAB0dnZe/t8NBajx/z37Df5OGX8d13xzAAAAAElFTkSuQmCC)
      }
    }
    </style>
    <style type="text/css">
    .ff0 {
      font-family: sans-serif;
      visibility: hidden;
    }


    .ff1 {
      font-family: ff1;
      line-height: 1.346191;
      font-style: normal;
      font-weight: normal;
      visibility: visible;
    }

          .cff1 {
              font-family: ff1;
              line-height: 1.346191;
              font-style: normal;
              font-weight: normal;
              visibility: visible;
          }


    .ff2 {
      font-family: ff2;
      line-height: 1.383301;
      font-style: normal;
      font-weight: normal;
      visibility: visible;
    }



    .ff3 {
      font-family: ff3;
      line-height: 0.707031;
      font-style: normal;
      font-weight: normal;
      visibility: visible;
    }


    .ff4 {
      font-family: ff4;
      line-height: 1.338867;
      font-style: normal;
      font-weight: normal;
      visibility: visible;
    }



    .ff5 {
      font-family: ff5;
      line-height: 1.330078;
      font-style: normal;
      font-weight: normal;
      visibility: visible;
    }



    .ff6 {
      font-family: ff6;
      line-height: 0.670898;
      font-style: normal;
      font-weight: normal;
      visibility: visible;
    }



    .ff7 {
      font-family: ff7;
      line-height: 0.672852;
      font-style: normal;
      font-weight: normal;
      visibility: visible;
    }

    .m6 {
      transform: matrix(0.237500, 0.000000, 0.000000, 0.250000, 0, 0);
      -ms-transform: matrix(0.237500, 0.000000, 0.000000, 0.250000, 0, 0);
      -webkit-transform: matrix(0.237500, 0.000000, 0.000000, 0.250000, 0, 0);
    }

    .m4 {
      transform: matrix(0.240000, 0.000000, 0.000000, 0.250000, 0, 0);
      -ms-transform: matrix(0.240000, 0.000000, 0.000000, 0.250000, 0, 0);
      -webkit-transform: matrix(0.240000, 0.000000, 0.000000, 0.250000, 0, 0);
    }

    .m1 {
      transform: matrix(0.245000, 0.000000, 0.000000, 0.250000, 0, 0);
      -ms-transform: matrix(0.245000, 0.000000, 0.000000, 0.250000, 0, 0);
      -webkit-transform: matrix(0.245000, 0.000000, 0.000000, 0.250000, 0, 0);
    }

    .m2 {
      transform: matrix(0.245000, 0.000000, 0.000000, 0.250000, 0, 0);
      -ms-transform: matrix(0.245000, 0.000000, 0.000000, 0.250000, 0, 0);
      -webkit-transform: matrix(0.245000, 0.000000, 0.000000, 0.250000, 0, 0);
    }

          .cm2 {
              transform: matrix(0.245000, 0.000000, 0.000000, 0.250000, 0, 0);
              -ms-transform: matrix(0.245000, 0.000000, 0.000000, 0.250000, 0, 0);
              -webkit-transform: matrix(0.245000, 0.000000, 0.000000, 0.250000, 0, 0);
          }

    .m5 {
      transform: matrix(0.247500, 0.000000, 0.000000, 0.250000, 0, 0);
      -ms-transform: matrix(0.247500, 0.000000, 0.000000, 0.250000, 0, 0);
      -webkit-transform: matrix(0.247500, 0.000000, 0.000000, 0.250000, 0, 0);
    }

    .m0 {
      transform: matrix(0.250000, 0.000000, 0.000000, 0.250000, 0, 0);
      -ms-transform: matrix(0.250000, 0.000000, 0.000000, 0.250000, 0, 0);
      -webkit-transform: matrix(0.250000, 0.000000, 0.000000, 0.250000, 0, 0);
    }

    .m3 {
      transform: none;
      -ms-transform: none;
      -webkit-transform: none;
    }

    .v6 {
      vertical-align: -15.996000px;
    }

    .v7 {
      vertical-align: -12.200000px;
    }

    .v8 {
      vertical-align: -7.516000px;
    }

    .v4 {
      vertical-align: -6.004000px;
    }

    .v1 {
      vertical-align: -4.000000px;
    }

    .v2 {
      vertical-align: -2.020000px;
    }

    .v0 {
      vertical-align: 0.000000px;
    }

    .v3 {
      vertical-align: 4.008000px;
    }

    .v5 {
      vertical-align: 45.656000px;
    }

    .ls1 {
      letter-spacing: 0.000000px;
    }

    .ls0 {
      letter-spacing: 28.240000px;
    }

    .sc_ {
      text-shadow: none;
    }

    .sc0 {
      text-shadow: -0.015em 0 transparent, 0 0.015em transparent, 0.015em 0 transparent, 0 -0.015em transparent;
    }

          .csc0 {
              text-shadow: -0.015em 0 transparent, 0 0.015em transparent, 0.015em 0 transparent, 0 -0.015em transparent;
          }

    @media screen and (-webkit-min-device-pixel-ratio:0) {
      .sc_ {
        -webkit-text-stroke: 0px transparent;
      }
      .sc0 {
        -webkit-text-stroke: 0.015em transparent;
        text-shadow: none;
      }

          .csc0 {
              -webkit-text-stroke: 0.015em transparent;
              text-shadow: none;
          }
    }

    .ws11 {
      word-spacing: -12.000000px;
    }

    .ws1c {
      word-spacing: -10.000000px;
    }

    .wsc {
      word-spacing: 0.000000px;
    }

    .ws3 {
      word-spacing: 23.640000px;
    }

    .ws8 {
      word-spacing: 23.760000px;
    }

    .ws7 {
      word-spacing: 25.880000px;
    }

    .ws0 {
      word-spacing: 26.000000px;
    }

    .ws9 {
      word-spacing: 28.240000px;
    }

    .ws6 {
      word-spacing: 32.680000px;
    }

    .ws4 {
      word-spacing: 34.880000px;
    }

    .ws22 {
      word-spacing: 36.000000px;
    }

    .ws1d {
      word-spacing: 56.000000px;
    }

    .ws24 {
      word-spacing: 56.760000px;
    }

    .ws26 {
      word-spacing: 59.800000px;
    }

    .ws19 {
      word-spacing: 65.760000px;
    }

    .ws1b {
      word-spacing: 65.764000px;
    }

    .wsf {
      word-spacing: 68.000000px;
    }

    .ws16 {
      word-spacing: 95.320000px;
    }

    .wsa {
      word-spacing: 95.760000px;
    }

    .ws10 {
      word-spacing: 95.764000px;
    }

    .ws1f {
      word-spacing: 95.768000px;
    }

    .ws15 {
      word-spacing: 97.428000px;
    }

    .ws12 {
      word-spacing: 98.004000px;
    }

    .ws17 {
      word-spacing: 99.720000px;
    }

    .ws14 {
      word-spacing: 99.812000px;
    }

    .ws1 {
      word-spacing: 100.240000px;
    }

    .wsd {
      word-spacing: 100.244000px;
    }

    .wse {
      word-spacing: 104.680000px;
    }

    .ws18 {
      word-spacing: 104.716000px;
    }

    .ws1a {
      word-spacing: 106.880000px;
    }

    .ws13 {
      word-spacing: 124.272000px;
    }

    .ws21 {
      word-spacing: 127.356000px;
    }

    .ws25 {
      word-spacing: 128.004000px;
    }

    .ws5 {
      word-spacing: 174.000000px;
    }

    .ws1e {
      word-spacing: 184.400000px;
    }

    .wsb {
      word-spacing: 263.640000px;
    }

    .ws2 {
      word-spacing: 263.680000px;
    }

    .ws20 {
      word-spacing: 400.680000px;
    }

    .ws23 {
      word-spacing: 457.120000px;
    }

    ._d {
      margin-left: -966.920000px;
    }

    ._6 {
      margin-left: -954.960000px;
    }

    ._1f {
      margin-left: -936.320000px;
    }

    ._22 {
      margin-left: -903.000000px;
    }

    ._18 {
      margin-left: -850.840000px;
    }

    ._0 {
      margin-left: -807.080000px;
    }

    ._7 {
      margin-left: -743.680000px;
    }

    ._1e {
      margin-left: -727.480000px;
    }

    ._1d {
      margin-left: -716.360000px;
    }

    ._11 {
      margin-left: -673.800000px;
    }

    ._20 {
      margin-left: -663.040000px;
    }

    ._21 {
      margin-left: -656.440000px;
    }

    ._17 {
      margin-left: -652.000000px;
    }

    ._1b {
      margin-left: -645.400000px;
    }

    ._10 {
      margin-left: -635.960000px;
    }

    ._19 {
      margin-left: -543.120000px;
    }

    ._1a {
      margin-left: -378.160000px;
    }

    ._e {
      margin-left: -333.280000px;
    }

    ._a {
      margin-left: -237.120000px;
    }

    ._3 {
      margin-left: -226.880000px;
    }

    ._c {
      margin-left: -225.740000px;
    }

    ._13 {
      margin-left: -216.148000px;
    }

    ._26 {
      margin-left: -4.000000px;
    }

    ._2 {
      margin-left: -1.200000px;
    }

    ._4 {
      width: 13.760000px;
    }

    ._9 {
      width: 18.240000px;
    }

    ._1 {
      width: 23.760000px;
    }

    ._8 {
      width: 26.000000px;
    }

    ._5 {
      width: 28.240000px;
    }

    ._23 {
      width: 29.840000px;
    }

    ._b {
      width: 42.920000px;
    }

    ._24 {
      width: 45.160000px;
    }

    ._25 {
      width: 58.480000px;
    }

    ._15 {
      width: 95.764000px;
    }

    ._14 {
      width: 97.268000px;
    }

    ._16 {
      width: 100.244000px;
    }

    ._12 {
      width: 321.284000px;
    }

    ._f {
      width: 715.648000px;
    }

    ._1c {
      width: 1642.116000px;
    }

    .fc1 {
      color: rgb(0, 0, 255);
    }

    .fc0 {
      color: rgb(0, 0, 0);
    }

          .cfc0 {
              color: rgb(0, 0, 0);
          }

    .fs4 {
      font-size: 32.000000px;
    }

    .fs0 {
      font-size: 36.000000px;
    }

    .fs1 {
      font-size: 40.000000px;
    }

          .cfs1 {
              font-size: 40.000000px;
          }

    .fs3 {
      font-size: 44.000000px;
    }

    .fs5 {
      font-size: 48.000000px;
    }

    .fs2 {
      font-size: 56.000000px;
    }

    .y0 {
      bottom: -0.500000px;
    }

    .y1 {
      bottom: 21.442000px;
    }

    .y134 {
      bottom: 49.605000px;
    }

    .y133 {
      bottom: 62.555000px;
    }

    .y132 {
      bottom: 75.505000px;
    }

    .y117 {
      bottom: 85.908000px;
    }

    .y131 {
      bottom: 88.455000px;
    }

    .y35 {
      bottom: 90.157000px;
    }

    .y41 {
      bottom: 93.216000px;
    }

    .y116 {
      bottom: 98.858000px;
    }

    .y130 {
      bottom: 101.405000px;
    }

    .y14c {
      bottom: 107.856000px;
    }

    .y34 {
      bottom: 108.158000px;
    }

    .y115 {
      bottom: 111.808000px;
    }

    .y42 {
      bottom: 114.158000px;
    }

    .y43 {
      bottom: 114.168000px;
    }

    .y12f {
      bottom: 114.355000px;
    }

    .yf2 {
      bottom: 116.599000px;
    }

    .y33 {
      bottom: 118.158000px;
    }

    .y12e {
      bottom: 127.305000px;
    }

    .yf1 {
      bottom: 129.549000px;
    }

    .y32 {
      bottom: 132.159000px;
    }

    .y44 {
      bottom: 138.156000px;
    }

    .y45 {
      bottom: 138.166000px;
    }

    .y135 {
      bottom: 139.304000px;
    }

    .y112 {
      bottom: 140.860000px;
    }

    .y31 {
      bottom: 142.159000px;
    }

    .yf3 {
      bottom: 142.849000px;
    }

    .y14d {
      bottom: 143.856000px;
    }

    .y84 {
      bottom: 153.345000px;
    }

    .ya1 {
      bottom: 156.158000px;
    }

    .y87 {
      bottom: 158.844000px;
    }

    .y30 {
      bottom: 158.979000px;
    }

    .y12d {
      bottom: 160.156000px;
    }

    .y3e {
      bottom: 162.170000px;
    }

    .yf0 {
      bottom: 165.158000px;
    }

    .y83 {
      bottom: 166.346000px;
    }

    .ya0 {
      bottom: 168.158000px;
    }

    .y86 {
      bottom: 170.844000px;
    }

    .y2f {
      bottom: 170.979000px;
    }

    .yd6 {
      bottom: 178.757000px;
    }

    .y14b {
      bottom: 179.856000px;
    }

    .y113 {
      bottom: 179.860000px;
    }

    .y9f {
      bottom: 180.158000px;
    }

    .y12c {
      bottom: 182.290000px;
    }

    .y82 {
      bottom: 183.346000px;
    }

    .y85 {
      bottom: 184.345000px;
    }

    .y3d {
      bottom: 186.161000px;
    }

    .yee {
      bottom: 187.207000px;
    }

    .y2e {
      bottom: 189.159000px;
    }

    .yd5 {
      bottom: 190.757000px;
    }

    .y183 {
      bottom: 194.679000px;
    }

    .y81 {
      bottom: 196.347000px;
    }

    .yed {
      bottom: 200.157000px;
    }

    .y114 {
      bottom: 200.290000px;
    }

    .y8c {
      bottom: 200.846000px;
    }

    .y2d {
      bottom: 201.159000px;
    }

    .yd4 {
      bottom: 202.757000px;
    }

    .y14a {
      bottom: 203.587000px;
    }

    .y9e {
      bottom: 204.158000px;
    }

    .y9d {
      bottom: 208.158000px;
    }

    .y3f {
      bottom: 210.159000px;
    }

    .yef {
      bottom: 212.157000px;
    }

    .y80 {
      bottom: 213.345000px;
    }

    .y8b {
      bottom: 214.345000px;
    }

    .yd3 {
      bottom: 216.260000px;
    }

    .y9c {
      bottom: 220.158000px;
    }

    .y15f {
      bottom: 222.158000px;
    }

    .y1e {
      bottom: 225.157000px;
    }

    .y12a {
      bottom: 225.159000px;
    }

    .y3c {
      bottom: 228.160000px;
    }

    .y8a {
      bottom: 230.845000px;
    }

    .y182 {
      bottom: 231.110000px;
    }

    .y7f {
      bottom: 231.345000px;
    }

    .y103 {
      bottom: 232.004000px;
    }

    .y9b {
      bottom: 232.158000px;
    }

    .yec {
      bottom: 233.037000px;
    }

    .yd7 {
      bottom: 233.257000px;
    }

    .y185 {
      bottom: 236.677000px;
    }

    .y1d {
      bottom: 237.157000px;
    }

    .y3b {
      bottom: 238.160000px;
    }

    .y97 {
      bottom: 244.157000px;
    }

    .y9a {
      bottom: 244.158000px;
    }

    .y89 {
      bottom: 244.344000px;
    }

    .y102 {
      bottom: 244.954000px;
    }

    .yeb {
      bottom: 245.987000px;
    }

    .y142 {
      bottom: 249.755000px;
    }

    .y7e {
      bottom: 250.345000px;
    }

    .y40 {
      bottom: 256.160000px;
    }

    .y101 {
      bottom: 257.904000px;
    }

    .y1c {
      bottom: 258.158000px;
    }

    .yd2 {
      bottom: 258.259000px;
    }

    .yea {
      bottom: 261.156000px;
    }

    .y12b {
      bottom: 261.159000px;
    }

    .y15e {
      bottom: 262.158000px;
    }

    .y7d {
      bottom: 262.345000px;
    }

    .y99 {
      bottom: 264.156000px;
    }

    .yd1 {
      bottom: 270.259000px;
    }

    .y149 {
      bottom: 270.755000px;
    }

    .y100 {
      bottom: 270.854000px;
    }

    .y184 {
      bottom: 273.108000px;
    }

    .y7c {
      bottom: 274.345000px;
    }

    .y3a {
      bottom: 275.590000px;
    }

    .y1b {
      bottom: 279.157000px;
    }

    .y90 {
      bottom: 279.346000px;
    }

    .y98 {
      bottom: 280.157000px;
    }

    .ye6 {
      bottom: 281.549000px;
    }

    .y169 {
      bottom: 281.594000px;
    }

    .y7b {
      bottom: 286.345000px;
    }

    .yd9 {
      bottom: 288.261000px;
    }

    .y111 {
      bottom: 288.484000px;
    }

    .y96 {
      bottom: 292.157000px;
    }

    .y88 {
      bottom: 293.974000px;
    }

    .ye5 {
      bottom: 294.159000px;
    }

    .y8d {
      bottom: 294.347000px;
    }

    .y145 {
      bottom: 294.754000px;
    }

    .y129 {
      bottom: 297.159000px;
    }

    .y1a {
      bottom: 298.157000px;
    }

    .y7a {
      bottom: 298.345000px;
    }

    .yd8 {
      bottom: 300.261000px;
    }

    .y110 {
      bottom: 301.434000px;
    }

    .y19 {
      bottom: 310.157000px;
    }

    .y17 {
      bottom: 310.158000px;
    }

    .ye4 {
      bottom: 310.159000px;
    }

    .y10f {
      bottom: 314.384000px;
    }

    .y168 {
      bottom: 314.560000px;
    }

    .y8f {
      bottom: 314.844000px;
    }

    .y144 {
      bottom: 318.754000px;
    }

    .y128 {
      bottom: 320.290000px;
    }

    .y28 {
      bottom: 321.214000px;
    }

    .yd0 {
      bottom: 322.392000px;
    }

    .y75 {
      bottom: 323.773000px;
    }

    .ye3 {
      bottom: 327.209000px;
    }

    .y10e {
      bottom: 327.334000px;
    }

    .y8e {
      bottom: 327.345000px;
    }

    .y167 {
      bottom: 327.510000px;
    }

    .y16 {
      bottom: 330.158000px;
    }

    .y18 {
      bottom: 330.168000px;
    }

    .yc6 {
      bottom: 333.159000px;
    }

    .ycf {
      bottom: 336.792000px;
    }

    .ye2 {
      bottom: 340.159000px;
    }

    .y10d {
      bottom: 340.284000px;
    }

    .y166 {
      bottom: 340.460000px;
    }

    .y27 {
      bottom: 342.164000px;
    }

    .y143 {
      bottom: 342.755000px;
    }

    .yb2 {
      bottom: 345.160000px;
    }

    .y79 {
      bottom: 345.343000px;
    }

    .y15 {
      bottom: 348.159000px;
    }

    .yce {
      bottom: 351.192000px;
    }

    .y10c {
      bottom: 353.234000px;
    }

    .y165 {
      bottom: 353.410000px;
    }

    .y4e {
      bottom: 354.156000px;
    }

    .y78 {
      bottom: 357.343000px;
    }

    .y14 {
      bottom: 358.159000px;
    }

    .y11f {
      bottom: 363.155000px;
    }

    .ye9 {
      bottom: 365.590000px;
    }

    .ycd {
      bottom: 365.592000px;
    }

    .y38 {
      bottom: 366.162000px;
    }

    .y164 {
      bottom: 366.360000px;
    }

    .y148 {
      bottom: 366.755000px;
    }

    .y53 {
      bottom: 369.159000px;
    }

    .y77 {
      bottom: 369.343000px;
    }

    .y13 {
      bottom: 372.158000px;
    }

    .y10b {
      bottom: 373.434000px;
    }

    .y163 {
      bottom: 379.310000px;
    }

    .yc7 {
      bottom: 381.159000px;
    }

    .y76 {
      bottom: 381.343000px;
    }

    .y12 {
      bottom: 382.158000px;
    }

    .y127 {
      bottom: 384.155000px;
    }

    .y147 {
      bottom: 384.754000px;
    }

    .y10a {
      bottom: 386.384000px;
    }

    .y29 {
      bottom: 390.164000px;
    }

    .ycb {
      bottom: 392.072000px;
    }

    .y162 {
      bottom: 392.260000px;
    }

    .ycc {
      bottom: 392.573000px;
    }

    .ye8 {
      bottom: 393.209000px;
    }

    .y146 {
      bottom: 394.754000px;
    }

    .y11 {
      bottom: 399.158000px;
    }

    .y109 {
      bottom: 399.334000px;
    }

    .yc5 {
      bottom: 400.169000px;
    }

    .y60 {
      bottom: 402.342000px;
    }

    .y54 {
      bottom: 405.159000px;
    }

    .y52 {
      bottom: 405.164000px;
    }

    .y161 {
      bottom: 405.210000px;
    }

    .ye7 {
      bottom: 406.159000px;
    }

    .yca {
      bottom: 407.572000px;
    }

    .y123 {
      bottom: 408.154000px;
    }

    .yc4 {
      bottom: 412.169000px;
    }

    .y108 {
      bottom: 412.284000px;
    }

    .y26 {
      bottom: 414.157000px;
    }

    .y5f {
      bottom: 414.342000px;
    }

    .y141 {
      bottom: 416.889000px;
    }

    .y160 {
      bottom: 418.160000px;
    }

    .y10 {
      bottom: 419.590000px;
    }

    .yc9 {
      bottom: 422.572000px;
    }

    .y16e {
      bottom: 423.058000px;
    }

    .yc3 {
      bottom: 424.169000px;
    }

    .y5e {
      bottom: 426.342000px;
    }

    .ye1 {
      bottom: 430.388000px;
    }

    .y122 {
      bottom: 432.154000px;
    }

    .y107 {
      bottom: 436.004000px;
    }

    .y25 {
      bottom: 438.158000px;
    }

    .y61 {
      bottom: 438.341000px;
    }

    .y5d {
      bottom: 438.342000px;
    }

    .y14e {
      bottom: 439.160000px;
    }

    .yc8 {
      bottom: 440.573000px;
    }

    .y51 {
      bottom: 441.164000px;
    }

    .y4f {
      bottom: 441.214000px;
    }

    .ye0 {
      bottom: 443.336000px;
    }

    .y106 {
      bottom: 448.954000px;
    }

    .y37 {
      bottom: 450.157000px;
    }

    .y21 {
      bottom: 456.147000px;
    }

    .y121 {
      bottom: 456.155000px;
    }

    .ybe {
      bottom: 458.478000px;
    }

    .y140 {
      bottom: 458.556000px;
    }

    .yc1 {
      bottom: 458.564000px;
    }

    .y5c {
      bottom: 458.842000px;
    }

    .y180 {
      bottom: 459.159000px;
    }

    .y95 {
      bottom: 460.163000px;
    }

    .y105 {
      bottom: 461.904000px;
    }

    .y170 {
      bottom: 464.676000px;
    }

    .y36 {
      bottom: 465.157000px;
    }

    .y20 {
      bottom: 466.147000px;
    }

    .y24 {
      bottom: 466.156000px;
    }

    .y6d {
      bottom: 468.158000px;
    }

    .y5b {
      bottom: 470.842000px;
    }

    .y15d {
      bottom: 472.158000px;
    }

    .y92 {
      bottom: 472.162000px;
    }

    .y94 {
      bottom: 472.163000px;
    }

    .ybf {
      bottom: 473.568000px;
    }

    .yc2 {
      bottom: 473.571000px;
    }

    .y104 {
      bottom: 474.854000px;
    }

    .y50 {
      bottom: 477.164000px;
    }

    .y6c {
      bottom: 478.158000px;
    }

    .y126 {
      bottom: 480.155000px;
    }

    .y5a {
      bottom: 482.842000px;
    }

    .y15c {
      bottom: 484.158000px;
    }

    .y186 {
      bottom: 485.870000px;
    }

    .y39 {
      bottom: 485.873000px;
    }

    .ybd {
      bottom: 488.569000px;
    }

    .y13e {
      bottom: 494.548000px;
    }

    .y13d {
      bottom: 494.558000px;
    }

    .y67 {
      bottom: 495.163000px;
    }

    .y59 {
      bottom: 495.344000px;
    }

    .yff {
      bottom: 496.104000px;
    }

    .y15b {
      bottom: 496.158000px;
    }

    .y125 {
      bottom: 498.154000px;
    }

    .y16f {
      bottom: 501.107000px;
    }

    .y1f {
      bottom: 501.157000px;
    }

    .yf {
      bottom: 501.158000px;
    }

    .y17f {
      bottom: 501.159000px;
    }

    .y23 {
      bottom: 501.160000px;
    }

    .yc0 {
      bottom: 506.524000px;
    }

    .y124 {
      bottom: 508.154000px;
    }

    .y15a {
      bottom: 508.158000px;
    }

    .y93 {
      bottom: 508.162000px;
    }

    .yfe {
      bottom: 509.054000px;
    }

    .y58 {
      bottom: 512.844000px;
    }

    .y159 {
      bottom: 520.158000px;
    }

    .y91 {
      bottom: 520.162000px;
    }

    .yfd {
      bottom: 522.004000px;
    }

    .y17e {
      bottom: 522.159000px;
    }

    .y6a {
      bottom: 522.163000px;
    }

    .y57 {
      bottom: 525.349000px;
    }

    .ye {
      bottom: 527.026000px;
    }

    .ya5 {
      bottom: 527.568000px;
    }

    .ya7 {
      bottom: 527.572000px;
    }

    .y22 {
      bottom: 527.590000px;
    }

    .y46 {
      bottom: 528.727000px;
    }

    .y120 {
      bottom: 529.566000px;
    }

    .y13c {
      bottom: 530.552000px;
    }

    .y6b {
      bottom: 532.158000px;
    }

    .y69 {
      bottom: 532.163000px;
    }

    .yfc {
      bottom: 534.954000px;
    }

    .yaf {
      bottom: 539.595000px;
    }

    .y17d {
      bottom: 540.159000px;
    }

    .ydf {
      bottom: 542.657000px;
    }

    .y56 {
      bottom: 543.249000px;
    }

    .yfb {
      bottom: 547.904000px;
    }

    .y154 {
      bottom: 548.541000px;
    }

    .y66 {
      bottom: 549.163000px;
    }

    .yd {
      bottom: 549.406000px;
    }

    .y17c {
      bottom: 550.159000px;
    }

    .ya4 {
      bottom: 551.568000px;
    }

    .ya6 {
      bottom: 551.572000px;
    }

    .y13b {
      bottom: 554.284000px;
    }

    .yde {
      bottom: 554.657000px;
    }

    .y55 {
      bottom: 555.344000px;
    }

    .yfa {
      bottom: 560.854000px;
    }

    .y157 {
      bottom: 562.759000px;
    }

    .y17b {
      bottom: 564.159000px;
    }

    .ydd {
      bottom: 566.657000px;
    }

    .yae {
      bottom: 572.658000px;
    }

    .y11a {
      bottom: 573.157000px;
    }

    .y17a {
      bottom: 574.159000px;
    }

    .y65 {
      bottom: 574.343000px;
    }

    .yb8 {
      bottom: 575.571000px;
    }

    .y156 {
      bottom: 576.861000px;
    }

    .y13f {
      bottom: 579.158000px;
    }

    .ydc {
      bottom: 580.157000px;
    }

    .yad {
      bottom: 586.159000px;
    }

    .y64 {
      bottom: 586.343000px;
    }

    .yf9 {
      bottom: 587.585000px;
    }

    .y153 {
      bottom: 587.861000px;
    }

    .y155 {
      bottom: 588.861000px;
    }

    .yb9 {
      bottom: 590.573000px;
    }

    .y4d {
      bottom: 591.212000px;
    }

    .y68 {
      bottom: 592.163000px;
    }

    .y179 {
      bottom: 593.873000px;
    }

    .y63 {
      bottom: 598.343000px;
    }

    .y13a {
      bottom: 600.919000px;
    }

    .yac {
      bottom: 602.659000px;
    }

    .ybc {
      bottom: 605.575000px;
    }

    .y5 {
      bottom: 606.159000px;
    }

    .y151 {
      bottom: 608.260000px;
    }

    .y118 {
      bottom: 609.157000px;
    }

    .y62 {
      bottom: 609.341000px;
    }

    .y139 {
      bottom: 613.867000px;
    }

    .yab {
      bottom: 614.659000px;
    }

    .y4 {
      bottom: 618.159000px;
    }

    .ybb {
      bottom: 620.575000px;
    }

    .y150 {
      bottom: 621.210000px;
    }

    .y178 {
      bottom: 622.160000px;
    }

    .y138 {
      bottom: 626.815000px;
    }

    .y4c {
      bottom: 627.212000px;
    }

    .y48 {
      bottom: 627.214000px;
    }

    .y72 {
      bottom: 627.341000px;
    }

    .yaa {
      bottom: 628.160000px;
    }

    .y3 {
      bottom: 630.159000px;
    }

    .yf5 {
      bottom: 633.158000px;
    }

    .y152 {
      bottom: 633.161000px;
    }

    .y14f {
      bottom: 634.160000px;
    }

    .yba {
      bottom: 635.574000px;
    }

    .y2 {
      bottom: 642.159000px;
    }

    .y2a {
      bottom: 643.659000px;
    }

    .y119 {
      bottom: 645.157000px;
    }

    .ya9 {
      bottom: 645.160000px;
    }

    .y71 {
      bottom: 645.344000px;
    }

    .y177 {
      bottom: 646.160000px;
    }

    .y47 {
      bottom: 648.154000px;
    }

    .y4b {
      bottom: 648.155000px;
    }

    .ya3 {
      bottom: 650.548000px;
    }

    .yb7 {
      bottom: 650.571000px;
    }

    .y176 {
      bottom: 658.160000px;
    }

    .y158 {
      bottom: 659.591000px;
    }

    .y2c {
      bottom: 662.160000px;
    }

    .y136 {
      bottom: 662.855000px;
    }

    .ya8 {
      bottom: 663.162000px;
    }

    .y70 {
      bottom: 663.339000px;
    }

    .y11b {
      bottom: 668.290000px;
    }

    .yb4 {
      bottom: 668.574000px;
    }

    .yf6 {
      bottom: 669.158000px;
    }

    .y175 {
      bottom: 670.160000px;
    }

    .y4a {
      bottom: 672.155000px;
    }

    .y74 {
      bottom: 672.159000px;
    }

    .ydb {
      bottom: 674.651000px;
    }

    .y2b {
      bottom: 679.159000px;
    }

    .yb1 {
      bottom: 681.160000px;
    }

    .y174 {
      bottom: 682.160000px;
    }

    .yb5 {
      bottom: 683.573000px;
    }

    .y16d {
      bottom: 684.446000px;
    }

    .y6f {
      bottom: 687.159000px;
    }

    .yda {
      bottom: 688.151000px;
    }

    .y11c {
      bottom: 689.859000px;
    }

    .y171 {
      bottom: 693.109000px;
    }

    .y173 {
      bottom: 694.160000px;
    }

    .y73 {
      bottom: 695.588000px;
    }

    .y16c {
      bottom: 697.394000px;
    }

    .ya2 {
      bottom: 698.548000px;
    }

    .yb6 {
      bottom: 698.571000px;
    }

    .yb0 {
      bottom: 699.158000px;
    }

    .y6e {
      bottom: 699.159000px;
    }

    .y137 {
      bottom: 701.855000px;
    }

    .yf4 {
      bottom: 705.158000px;
    }

    .y172 {
      bottom: 706.160000px;
    }

    .y16b {
      bottom: 710.342000px;
    }

    .y8 {
      bottom: 710.372000px;
    }

    .yc {
      bottom: 710.841000px;
    }

    .yf8 {
      bottom: 712.391000px;
    }

    .y11e {
      bottom: 712.393000px;
    }

    .yb {
      bottom: 721.641000px;
    }

    .y16a {
      bottom: 723.290000px;
    }

    .y7 {
      bottom: 723.572000px;
    }

    .y11d {
      bottom: 725.341000px;
    }

    .y49 {
      bottom: 725.590000px;
    }

    .yb3 {
      bottom: 725.601000px;
    }

    .yf7 {
      bottom: 726.791000px;
    }

    .y181 {
      bottom: 729.109000px;
    }

    .ya {
      bottom: 733.274000px;
    }

    .y6 {
      bottom: 746.019000px;
    }

    .y9 {
      bottom: 746.474000px;
    }

    .ha {
      height: 27.675781px;
    }

    .hb {
      height: 32.750000px;
    }

    .h2 {
      height: 37.423828px;
    }

    .h8 {
      height: 41.582031px;
    }

    .he {
      height: 41.938031px;
    }

    .h13 {
      height: 41.982031px;
    }

    .h3 {
      height: 42.226562px;
    }

    .hd {
      height: 42.234562px;
    }

    .hf {
      height: 42.386563px;
    }

    .h14 {
      height: 42.426563px;
    }

    .h12 {
      height: 42.910562px;
    }

    .h15 {
      height: 45.417969px;
    }

    .hc {
      height: 45.590031px;
    }

    .h6 {
      height: 45.740234px;
    }

    .h5 {
      height: 46.449219px;
    }

    .h9 {
      height: 49.546875px;
    }

    .h11 {
      height: 49.898438px;
    }

    .h7 {
      height: 50.671875px;
    }

    .h4 {
      height: 59.117188px;
    }

    .h10 {
      height: 87.238031px;
    }

    .h0 {
      height: 792.000000px;
    }

    .h1 {
      height: 792.500000px;
    }

    .w0 {
      width: 612.000000px;
    }

    .w1 {
      width: 612.500000px;
    }

    .x0 {
      left: 0.000000px;
    }

    .x1 {
      left: 35.980000px;
    }

    .x1c {
      left: 37.809000px;
    }

    .x3 {
      left: 39.148000px;
    }

    .x4 {
      left: 43.318000px;
    }

    .x2 {
      left: 46.108000px;
    }

    .xc {
      left: 54.000000px;
    }

    .xd {
      left: 60.001000px;
    }

    .x13 {
      left: 76.559000px;
    }

    .xe {
      left: 78.001000px;
    }

    .x11 {
      left: 88.437000px;
    }

    .x27 {
      left: 95.981000px;
    }

    .x14 {
      left: 106.050000px;
    }

    .x1a {
      left: 119.813000px;
    }

    .x18 {
      left: 137.861000px;
    }

    .x16 {
      left: 147.195000px;
    }

    .x19 {
      left: 149.814000px;
    }

    .x5 {
      left: 156.293000px;
    }

    .x7 {
      left: 211.600000px;
    }

    .x6 {
      left: 224.888000px;
    }

    .x1d {
      left: 273.841000px;
    }

    .x24 {
      left: 290.021000px;
    }

    .x10 {
      left: 317.999000px;
    }

    .x23 {
      left: 320.159000px;
    }

    .xf {
      left: 341.991000px;
    }

          .cxf {
              left: 341.991000px;
          }

    .x25 {
      left: 345.000000px;
    }

    .x1b {
      left: 360.000000px;
    }

    .x26 {
      left: 420.483000px;
    }

    .x21 {
      left: 425.999000px;
    }

    .x1e {
      left: 444.176000px;
    }

    .x12 {
      left: 449.361000px;
    }

    .x17 {
      left: 483.563000px;
    }

    .x20 {
      left: 486.000000px;
    }

    .x1f {
      left: 491.999000px;
    }

    .xa {
      left: 494.375000px;
    }

    .xb {
      left: 498.625000px;
    }

    .x22 {
      left: 504.000000px;
    }

    .x9 {
      left: 510.019000px;
    }

    .x8 {
      left: 517.796000px;
    }

    .x15 {
      left: 535.258000px;
    }

    </style>
    <title></title>
  </head>

  <body>
    <div id="sidebar">
      <div id="outline"> </div>
    </div>
    <div id="page-container">
      <div id="pf1" class="pf w0 h0" data-page-no="1">
        <div class="pc pc1 w0 h0">
          <img class="bi x0 y0 w1 h1" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABMkAAAYxCAIAAAAsbFyeAAAACXBIWXMAABYlAAAWJQFJUiTwAAAgAElEQVR42uzdZ1hU19428LX3DENnaFKVolQBFaXYEBCxoEHsYkkiYu+JYjdYYhdrNDawRFFsKKJgRRQioBQFBEVRFBAE6UOZmb3eD/s68/KgKeccz3mfN7l/H3JN9qxZu8zw4Xat9V8MpZQAAAAAAAAA/BtYPAIAAAAAAABAtgQAAAAAAABkSwAAAAAAAEC2BAAAAAAAAGRLAAAAAAAAAGRLAAAAAAAAQLYEAAAAAAAAZEsAAAAAAABAtgQAAAAAAABAtgQAAAAAAABkSwAAAAAAAEC2BAAAAAAAAGRLAAAAAAAAAGRLAAAAAAAAQLYEAAAAAAAAZEsAAAAAAABAtgQAAAAAAABAtgQAAAAAAABkSwAAAAAAAEC2BAAAAAAAAGRLAAAAAAAAAGRLAAAAAAAAQLYEAAAAAAAAZEsAAAAAAABAtgQAAAAAAABAtgQAAAAAAABkSwAAAAAAAEC2BAAAAAAAAGRLAAAAAAAAAGRLAAAAAAAAQLYEAAAAAAAAZEsAAAAAAABAtgQAAAAAAABAtgQAAAAAAABkSwAAAAAAAEC2BAAAAAAAAGRLAAAAAAAAAGRLAAAAAAAAQLYEAAAAAAAAZEsAAAAAAABAtgQAAAAAAABAtgQAAAAAAABkSwAAAAAAAEC2BAAAAAAAAGRLAAAAAAAAAGRLAAAAAAAAQLYEAAAAAAAAZEsAAAAAAABAtgQAAAAAAABAtgQAAAAAAABkSwAAAAAAAEC2BAAAAAAAAGRLAAAAAAAAAGRLAAAAAAAAQLYEAAAAAAAAZEsAAAAAAABAtgQAAAAAAABAtgQAAAAAAABkSwAAAAAAAEC2BAAAAAAAAGRLAAAAAAAAAGRLAAAAAAAAQLYEAAAAAAAAZEsAAAAAAABAtgQAAAAAAABAtgQAAAAAAABkSwAAAAAAAEC2BAAAAAAAAGRLAAAAAAAAAGRLAAAAAAAA+I8S/lVvjFL6Xz4dpVQqlebn52dnZ+fn5xcVFZWXl5eXl1dXVzc1NXEcJxAIlJWVtbW1DQwMDAwMzM3NbW1tHRwc7OzshEIhwzAMw/w3r/m/fDoAAAAAAEC2hN8klUp//fXXmzdv3rt3LyMjQyKRMAzDcdyfT3eqqqrdu3f38vLy9fV1d3cXiUR4qgAAAAAA8P8X5r88vvdf85+7L77noqKiK1euxMfHJyUl1dbW/vtnZBiGUioWi/v27Tto0KDhw4d36NDhP/vdY9wSAAAAAACQLf/72ZJSKpPJ4uLi9u3bd/fuXZlM1vpdlmUppe3atevSpYu9vb2lpaWJiYm+vr62traampqSkpJUKpVIJNXV1R8+fCgpKSksLMzLy3vy5MmHDx8+vWCBQODj4zNv3ryBAwfyM2aRLQEAAAAAANny//tsKZPJzp8/v3Hjxtzc3NZTXhmGMTQ0HDBgwIABAzw8PMzNzfnM9tnkRilVHOevkFL6+vXrBw8e3Lp169atW+Xl5YrO+RWYDg4Oy5cvHzVq1BdPmMiWAAAAAACAbPnfy5YNDQ2RkZG7du169uyZoluWZXv27Onv7+/t7e3s7CwQCH4rTKampvKVfrS0tOzs7AQCgUwmy83NdXJyUmQ8PnPKZLKMjIy7d+9evnw5JSVFETJZlrWzs1u0aNH48ePV1NS+VCZEtgQAAAAAAGTL/0a2pJReunRp4cKFxcXFig7V1dWDgoJmz55tY2PzaTx7+fLl6tWrf/nlF5Zl+R4uXrw4efLk8PDwvXv32tjYhIeHv3r1avLkyZaWlgzDODk5denSRVdX183NTZH3KKXPnz/ft2/f8ePHGxoaFKc2MzPbuXPn8OHDv0hRWWRLAAAAAABAtvzPZktKaU5OztKlS+Pi4hRdWVhYzJo1Kzg4WCwWK4JZdnb2s2fPevfu3b59e0JIZGTk1KlTIyIixo4dy7fJyclxdXWtq6s7duzY4sWLP378WF5eXl9fr6KiYmFhcfLkyYqKCg0NjUmTJu3cubNv3769evVSXEN1dfXRo0d/+umnN2/eKALh4MGDt2zZ4uDg8G+GQ2RLAAAAAAD4Ulg8gk/J5fI9e/b07Nnz+vXrfLAUi8X8nNjFixdra2uzLCuXy9evX29nZ3ft2rULFy64urpWVVXxSXL9+vVr1qxpbGzke2tpaSGEZGVlnT9/fuTIkYQQQ0PDTp065eXlEUJ8fX2nTp06atQogUDw7NmzH3/8sfWV6OjoLF68OD8/f+fOnWKxmA+ccXFxPXv23LNnj1wux5cFAAAAAADIlv/rUEolEsnXX3/9/fffSyQSQohAIJgyZUpOTs78+fOVlZUppfHx8RzHsSwbEBBQUFDQtWvXsLCw8vLynJwcQkhTU9OcOXOEQuGePXv4XMpxHKV05cqVxcXFBw8eVIwWvnz5Ul9fX1dXV1VVVVNTs6WlJTExsaSkhH+X47ijR4/evn1bJpOJRKL58+dnZ2d/++23QqGQECKRSL7//vvJkyfzFwkAAAAAAIBs+b9IRkaGm5vbmTNn+OI6Tk5ON27cOHLkiImJCaU0MzNzyZIl4eHhRUVFLMt26dLF1dX11KlTtbW15ubmnTt3lsvlqampy5cv79at26ZNm7Kzs/luGYY5evRoRUXFwYMHFeVh8/Pzu3btqoiaFy5cGDZsGL+wUyaTrV69etasWSkpKYrZsCYmJuHh4XFxcfxsWI7jzp496+7unpGRgS8OAAAAAACQLf9X4Dju+vXrAwYMyM3NpZSyLLtgwYKUlBQvLy+GYWpqaoKDg318fJYtW3bmzBkDAwP+UxMmTIiOjk5NTX348KGurm5hYeHIkSPDwsJ++eWXXr16TZ8+/f379+np6YSQ9+/fr1mzZtmyZfHx8XK5nGGYFy9edO3aVRE1IyMjv/nmm48fP9bV1a1ZsyYvL09PT+/777/v1KmTXC7fv38/P+fW29s7LS1t7ty5/HaaOTk5Pj4+rReFAgAAAAAAIFv+vyGTyX788ccRI0ZUV1czDGNsbHz27NkdO3aoqKjw44oaGhorVqyQSqUxMTEvX75ctGgRn+XGjh3LcZxYLDYwMJDJZCdOnCgrKyOESKXSUaNGLVu2jFLas2fPhw8fisXiadOmPXz40MLCghBy6dIlCwsLgUDw9u1biURy5cqVrl27mpmZcRw3d+5cBweHsrKycePGiUQiQgjDMDdu3PD19d25c2dTU5NIJNq1a9eZM2cMDQ0Zhqmurg4ICPjxxx9lMhm+SgAAAAAA+H8CdWIJx3Hffffd3r17+XmwVlZWMTEx1tbW/IaTT58+VVJS6ty5MyFk3bp1Bw4cGDFihKOj49SpU1VVVSmlAQEBUql0yZIlXl5eJSUlJiYm/H6VpNWGIp9WZFU0oJTK5fILFy7k5OSsWrWKn/hqaWnp7OycmJjYu3dvQsjp06dnzZqVnp5eUlKyfPnymJgYHR0dSumLFy+GDh366tUrvsP58+eHhYXxe5/8qe8edWIBAAAAAADZ8otkS0rp2rVrN2zYwHEcIaR79+6xsbH8lNfMzMylS5dWVVVlZma6uLicO3dOTU3N2tp6375948ePf/z4cUNDg52d3Z49e7y9vT09PZWUlBTdSiSSvLy8V69evXv3rqKiQiKRNDc3Kysrq6ur6+rqdujQoVOnTra2tmpqanzyVMyMTUlJUVNTi4iIiI2NzcvLEwgEVVVVjo6OgwYNOnz4MKX03Llz48ePb2lp4QsLlZWVDRs2jJ92yzDMmjVrVq9e/SfjJbIlAAAAAAB8KcK/881TSrdt28YHS5ZlPTw8zp49a2BgIJVK9+/fHxcXd+XKFWVl5fT09IkTJ86aNevy5cszZsxYvXq1trb2lStXhg0bZmhoyO8aIpfLCwsLExISEhMTHz16VFBQwG89wkc4gUCgGKKklPLrOZWUlKysrLp37+7l5eXp6Wlubi4QCHr16lVbW9ujRw+GYd6/f29sbLxu3To1NTUHB4dJkyYFBgYGBgYSQpKTk3/99dclS5YYGRldu3Zt3Lhx9+/f5zhu3bp1qqqqS5YsQW4EAAAAAID/pr/vuCWl9OTJk0FBQXywHDZsWGRkJL/A8tmzZ0lJSQsWLIiNjfXy8qKUJicne3t7f/z4saioaMCAAStWrJg5cyafGBsbG8+cOXPkyJGUlBRKqUAg6NKlS8+ePbt27WptbW1hYaGnp6empiYQCDiOa2hoqKysfP36dUFBQWZmZmpqalZWlkwmYxjG3d196tSp48ePV1VV5a+wqalp7dq1e/bsuXbtWp8+fbZu3bp8+XK+hM+WLVtWrVpVUFBgYWFBKW1sbJwwYcLVq1f5ezl27NjEiRP/MF4ifwIAAAAAALLlv5UtKaU3btwYMWJEU1MTy7L+/v6RkZHKysqKBhzHhYSEnDlz5sGDB3x+MzQ0LCwsfPv2rYmJiaamJqU0Nzd3//7958+fr6ysNDExGT58+KBBg3r37q2np/fnr7OysjIpKenGjRuXL18uKSnR09MbOXLknDlzOnfuzLJsdXX15s2btbW1x40bp6qqamRkRCmNiIj45ZdfUlNTq6qqysrKdHV11dTUWlpaxo8fHxMTw3GciorKpUuXBg4c+PvpEdkSAAAAAACQLf/1bEkpLS4udnNze//+PSHE1dX11q1bmpqainf50CWRSDw8PNq3b3/p0qX8/PwVK1ZcvHiRf6u0tHT16tUnT57kOM7d3X3x4sVDhw4VCoX/TlqTyWRXr17dvn17amoqy7ITJkzYsGEDv69menr6ypUrT506paOjExMTk5CQYGlpuXfv3hcvXrx8+XLJkiWnT59WUVGpr6/39vZOT0/nk/CjR49MTU2RLQEAAAAAANnyP5ItpVLpoEGD7t27Ryk1MTF5+PBh+/btFZ86ffq0r69vu3btCCHZ2dl9+/adO3fuixcvtm/fbmZmRik9f/78ggULysvL3d3dN27c2K9fvz8MafwyS5Zl/7DKDqX0/v37y5cvT01Nbdeu3a5du8aMGcMff/bsWV5e3qVLl44dO7Z69epHjx5duXIlMDBw4cKFxsbGtra2lNLS0lJXV9f3799TSr29vePi4lpXGEK2BAAAAACA/5C/3f6WlNKtW7cmJCRQSkUi0fHjx9sM7mVlZbm4uOzevbu2ttbR0XHfvn1qamrHjx/v0KFDSUnJmDFjAgMDtbW1IyMjExIS2gRLSmlzc3Nqauru3buDg4N9fHxsbW319PQ0NTXV1dU1NDT09PRsbGx8fHymTZu2e/fu1NTUlpaW1jGYYZh+/folJiZGRkaKxeIJEyaMGjWqpKSEYRh7e/t3795NnjxZIBAUFxdbWlp+//33S5cu9fT0tLGxaW5ufvnypbGx8YkTJ5SUlBiGSUhI2LZtG37iAAAAAADwX/D3GreklGZnZ/fs2bOxsZFl2c2bNy9evLhNm4KCgu7duzc0NOjr68+aNSsoKKhDhw4Mw3AcFxYWtmvXrtGjR2/YsEFDQ6P1pziOe/jwYURERHR0dFVVFb+jyR88eoZhGEZHRycgICAoKMjNzU0gELRuUF9fv2rVqv379+vo6Jw7d87Dw4MQIpVKRSKRr6+viorKggULXF1d5XK5pqZmUFCQrq7uzp07GYbZtm3b8uXLKaVqamq//vqro6PjZ4coMW4JAAAAAADIlv9Ktqyvr+/bt++TJ08Yhhk6dGh0dHSbSar8Uszvv//+3LlzfPpSUlLy8PAYOHCgv7+/tbW1XC5vva6Sr9F6/Pjxw4cPZ2Zm/ovfAcNQSrt16zZt2rRvvvlGVVW1df+xsbEzZsyoq6vbt2/f5MmT+cb19fUikejs2bPr16+/efOmubm5TCb7+eefDQ0Nx4wZI5fL/f394+Pj+W4TExPbJGFkSwAAAAAAQLb8F7MlpTQkJCQsLIxSqq6u/uTJE0tLyzZtGhoa7O3ti4uLP/04y7J82R5/f39+gFEmkx05cmTjxo2fbf8vJExCiKmp6cqVK6dOnSoUChWXXVpaWlBQ0LNnT6FQKJfLHz16dPbs2cjIyI8fP7q7uycmJjIM8+rVq1GjRr1+/frBgwcODg6vX7/u2rVrfX09y7Lff//9li1bkC0BAAAAAADZ8gtky5cvXzo6OjY3N7Ms++OPPy5ZsuTTyjqU0l9//fXrr78uLCz87JNhWbZfv34HDx60srLKzc318fEpLy//slfOsqyPj094eLhiISiltKWlJSEhISYmht+qhK8M1LNnz7NnzxobG8fGxk6bNs3S0vLYsWObNm3auHGjoaHh9u3bV6xYQSlVUVHJzs7u2LEjsiUAAAAAAPyH/F1q+VBKN27c2NzcTAjp2rXrwoUL+SWUn7bs3bv3kydPfv75Z1VV1U/f5Tju3r17ffr0uXr1qr29fWxsrJaW1he/WmNjY4lEQimVy+XXrl0LCgoyMzPz8/Pbv38/P0YqFAp37dqVkJAgEomWL18+bty4CRMm3Lp1y9raWltbu6ioSCAQLFy4sGvXroSQpqamjRs3/lX/EQEAAAAAAP43+LuMWz5//tzJyUkqlTIMc/HixeHDh1dXV4eEhKxfv97Q0FCRG/mhvIaGhp49e+bm5v7mU2MYoVAYHx/v6em5dOnS7du3f6nLVlZWPnbs2NixYymlCQkJ8+bNy8vL+/Q74osApaamrl+/Pj4+/tSpU56enizLchzXekXo5cuXR40axXGckpLS06dPbWxs2nSCPwAAAAAAAPgi/hbjlpTSzZs3S6VSQoiTk9PQoUMppceOHevevfubN2+4f8jKyurVqxelVElJaeHChV5eXurq6gKB4NMMRimVSqW7d+8mhLi6un6pkMYwzMqVK/liPBs2bPDz83v27FmbYCkQCHR1db28vFauXKmtrb1z58758+d7eXnx83tZluU3IOEbDx061MHBgRAilUq3bNmCoUsAAAAAAPgP+VuMW7569crBwYFfaRkXFzdgwABKaWBg4MmTJ+/fv79jx46UlJQBAwbs2rXr2bNn3t7eig/W1dV99dVXiYmJnz1Fjx490tLSrl+/PmzYsN96jHzM40u/NjY2Ukp/54GLRKKysjItLa358+cfOHDgs1N27e3tb9y4YWJiogiQtbW1vzMvNz4+fujQoRzHKSsr5+TktF51iXFLAAAAAAD4Uv4W45ZHjhzhV1p6e3v7+PjwBwUCgZGR0cCBA9+9e7dr1y6hUBgVFdU6WBJC0tLSXr169VsZrFOnToSQly9f/lZcZFl22LBhr169qqmpqampKSwsHDp06KcFhBTU1NS0tLRqa2uPHDny2WDJsmx5eXlcXFzrS2odLCmleXl5hw8fvnTpUlNTEyHE19fX09OTENLc3BweHo5fPAAAAAAA/Cf89cctW1pabG1t37x5wzDMzZs3+/fvz79bX19/4cIFAwMDX19fgUCwbds2e3t7f3//rKysO3fuTJgwwdDQkFIqk8kyMzMzMjL27NnTegUmwzAnT54MDAwcMmTIjRs3Pr0AR0fHTZs2ubu7x8XF6enpDRo0iGVZqVS6ffv2U6dOVVRUfPjw4dP5rlVVVTU1NWZmZm3eMjIyCgkJcXZ2dnV1VWyAybdR5EyO41auXBkWFta+fXtjY+Pm5uZffvnF1tb29u3bAwcOpJRaWFjk5eWJRCLFLeAPAAAAAAAAvoi//rjl9evX37x5QwhxcnLiR/D4WKWpqfntt98OGTKkoKBg4sSJlZWVw4YNk8lkwcHBa9eubWlp4ZspKSn16NGjubk5Ly+vTc8DBgyQSCT37t377HnnzZvn6empqqo6YcKEIUOG8MOVQqFw9OjRU6ZMkUqln6Z6juNevHhhYGCgpKTU5q2ysrKsrKw+ffqoqanxmVAmky1cuNDX15dfR8rf6e7duyMiIgoKCh48eBAbG3vkyBFCiLe3t6OjIyHk9evX8fHx+NEDAAAAAACy5T+HUnrq1Cn+9YgRIwQCAcdxrUMdwzC2trYhISEzZsxgGObatWsZGRnTpk1r3769ok11dfXZs2f5oj6KsT5dXd127dq9f/+eT6GfOnPmjLGxsYGBwf79+1uf7vr16yEhIVVVVZ/91KtXr4RCob6+fuuPsCzLsmxSUtLjx48Vx4VCoaqqamJiYkxMDH9HDx482LZt2/jx4/mL1NfX5zcsYVl2xIgR/Kd++eUX/OgBAAAAAADZ8p9TXV199epVQgjLsqNGjaKUpqamFhYWtg6fxcXFXbp06dSpE8dx27Zt09LSWrx4cev5ojo6OomJiR8/fnz8+HG/fv34t/hxSG1tbaFQ+NlTJyQkSCSSxsbGJUuWvHv3TnG8S5cuv5OEGxoaGIbR09NTHLSzs7t161ZZWVl+fr6rq2vr9t99952WltaOHTv4xZlqamp+fn78hXEcd+zYsffv3/Oxc/To0fxlX7169bdiLQAAAAAAALLl5925c4cvaePo6MjvxnH9+vU5c+asXLkyPT2dUiqRSOzs7JKSkgghDx48ePjw4bx589q1a9e6E37kUEVFZcuWLYmJiXxaq6ioePfuna6urq+v72cXLipKwmppaamrqyuO8xWAPv9lsKyJiQmlVFlZWXHw2bNnISEh/KhpmzpA7dq1mz9/fmpqKl/JduzYsXPmzImJibl69eqkSZNmzJgxbdo0/iMODg78tNimpqa7d+/idw8AAAAAAMiW/4Tbt2/z4XDMmDF8Ahw1alRMTMz48eMTEhK+/fbbixcvPn36tHfv3pTSLVu2aGhozJ8//7OlXPPz8wsLC1uPUvJlV/fu3WtqavpbF+Dg4HD//n0dHR3FEUNDw98a6jQ1Ne3Tpw+l9O3bt4qDAoGgoaEhNTX10/WZDMPMmzdPU1Nz69atlFIbG5vly5fv3r07ODj41atXx48fHzt2bHNzs0wmI4TwT4BSyj8TAAAAAACAL+gvXifWyckpJyeHYZisrCxHR0e5XM6yrKLIqlwuDw4OPnDggKqqan5+vqOj4zfffHP48OHfKqBKKa2urs7MzJw2bVphYaGamtrdu3e7d+/+9OnTgICAoqKiNg9TJBJlZmba2tq27pBSamdn9+LFizYpUSAQXLp0yc/P78aNG35+fpRSsVgcHh7u5uZmYmJCfrus67Rp0yIiIp48edK5c2e+fz5Dkn8sN7WwsPDw8Hj69Gm3bt0opY6Ojk+ePCGoEwsAAAAAAF+O8C98bzU1Nc+fPyeE6Ovr29nZUUq3bds2e/ZsTU1NvoFAILC0tKytrVVWVo6MjKSU+vv7/07iYhhGW1s7Nze3sLCQn0/r7+8fHR3t4uKSnp6+d+/eq1evmpub29nZderUycDAQCQS1dfX37x5s7GxkeM4lmXV1NR0dHQOHTrU0NDw4cOHly9fPnv2LDMzU1lZeceOHb6+vuXl5d999x1/rtra2vj4+ICAgN8Pgf7+/hEREadPn16/fj3HcZmZmR07drx169bNmzdv37795s2bVatWeXh4dO7cWV9f/8OHD/n5+bW1ta13xQQAAAAAAEC2/E1JSUn8/hzu7u4CgYAQEhkZuXnzZg8PD19f3/79+2tpaT158oQvyhoZGSkWi318fP6w2/Lycn9/fyUlpeTk5JKSEm9v75CQkLlz59rb23Mcl5eXFx8fX1xcXFVVJZVKxWJxTU0NwzCmpqbFxcUcx+no6FRVVYlEIh0dHVNT044dO06cONHBwcHV1TUxMTE4OJgfER02bFhjY6NcLm9paWm9/PJTPj4+YrE4Kipq3bp1LMv+8MMPt27dMjQ0ZBhm0aJFvXv3DgsLI4SwLOvu7n716lWpVJqUlDRkyBD8+gEAAAAA4Ev5K6+3TElJ4Uf8nJ2dGYapqqratm3bxYsXLSwstm/f3qVLF2tr6/Hjx7MsW1BQUFBQMHjw4NZFd3htprkyDBMaGnrp0qXNmzdXVFQQQhobG7ds2ZKWljZ+/Pjt27eLRKKsrCxra+ugoCBK6dixY93c3EQiUUhIiLKycvfu3QMDAwkh33zzjY2NTUZGhkgk2rFjx/jx49PS0vz8/F69esWPiAYGBkZHRx86dKhNsGxqampzSWpqakOGDHn58iU/z9bT0zM9Pb2wsHDEiBGjR4/u0aOHjo7O69evGYbp1q0bfwupqan46QMAAAAAALLln5KVlcUvPuQrxOrq6g4cOLB///579+4tLCzMzs4uLCzkK9w8ePCAENJ6KG/FihVfffXV4sWLq6ur23TLr2Y8duyYVCplWVZZWVkqlfIJsKmp6c2bN5TSrKys48ePi8Xiw4cPp6en6+npzZ07V1dX98mTJ4cPHxaLxSdPnkxPT2dZtqioiK9kKxKJWlpaVFRU+P4jIiLI55ZESiSSNWvWDBo0aMWKFYqDQ4cOJYQ8ePCAr+7TuXNnfmXphQsXPn78aGlpyW/CyZeKpZRmZGT8VdfZAgAAAAAAsuWXxHFcbm4uH6VsbGzavCsQCDp37szXyCGEPH78mGGY/v378//b1NS0d+/erKysNWvWaGtrf7Z/gUAwb968ixcvrlixgk+wAoHAy8vr6dOndnZ248aNa2xs/P777x0cHHR0dCZMmMCy7KBBgzp37qyrq7tlyxaZTObh4TFw4MCUlJR+/fopKSmxLEspHT58+N27d5cuXaqnp/dp/KOU6urqhoaGEkL27NnT2NjIH/f29mZZ9vHjx4QQFRUVQohQKNy2bdv8+fP19fWXLFnCPwErKyu+Pf9kAAAAAAAAvpS/7HrL5ubmoqIiQgjDMObm5r/fOD8/39jY2NjYWBG9JBLJ/PnzNTU1m5qa7ty54+vrKxKJWn9kzZo1fOf5+fmUUn7/yW7duqWmppaWll6+fJnjuNDQUH6Xy23btjEMExERwVf0mTNnjkwmS0tLU1JSksvlvXr1SklJ4QvYKikp9evXz8PD49OLlMlkSUlJLi4uampq06dPv3379rNnz7p3704IMTIyMjExycvLUzRmGObTMU9zc3OWZTmOKyoq4sdI8W6cgFQAACAASURBVAcAAAAAAABfxF923LKsrIyfCKqtrf1bY488Sunz58+7du2qOJKdnU0IuXXrlq+vr4WFhbq6upKSUutRROYfCCEBAQExMTE2NjYymSwsLExLS0sqlTY2Nn799dcsy/J1g5SUlNavX6+pqdmpU6fAwEC5XB4QEKCkpPTx48d27dpt2rSpsbGxc+fO9+/fnzVrVpv++SvkOE4gEBgZGXXs2NHV1fWHH36glObk5CguqUuXLi9evPj9ma66urp8ediWlpbKykr8+gEAAAAAANnyD5SUlPAv+Iqpv9OyqamptLTU2tpacYQPaWlpaXfu3Gnfvr2npyfHcTdv3vxscrO2tvbz89PS0uLPMmjQIEtLS4lEUlZWJpfLMzMzU1JSWlpaduzYIZFIKioqrl27RggpLi6WyWRqamozZswghAgEAk1NzV69evXq1evTU8hksqdPnxJCbGxsunXrlpGRkZuby0diRfi0s7MrLS2VSCS/c6cMwxgZGfGvy8vL8esHAAAAAIAv5S87J5Yv4koIUaSp31JeXs5xnJmZmSKCKnIpIURDQ2PVqlVxcXGBgYG+vr4cx/EzYNt0oqysrKKiwnHco0ePOnbs2LdvXxMTk6+++kooFPLdmpubFxUV8VNkZTJZTU1NaWlpUVHRhQsXlJWVhUKhkpLSp9fGcRwhRCgUZmZmrly50sfHh++Bf7e4uFgRGjt06EApLS8vt7S0/J2bNTAw4KfO1tTU4NcPAAAAAADIln+goaFBEQ5/v2VlZSXDMIaGhnyWY1m2vLycZVmxWFxdXX3//v379++zLHv58uXm5ubw8PBp06Z9mi0JIdHR0XV1dXl5ebm5uY8fP7548WJlZaVMJuPTYEJCwowZM/gasEpKSvr6+mZmZvwmKJ07d9bQ0OALArXpUy6Xnzx5cvLkyb6+vlOmTOHHPBV58uPHj4r8aWBgwN/L72dLTU3NNs8HAAAAAAAA2fI3KWaHttkf8lN1dXWUUjU1NUJIXl4ey7ISiWTQoEHTp08fMWKEIqDu3LkzKipq1KhRQuFnHhrDMNOnT1eMTH72RPxbDMO0tLSUlJSUlJQ8fPiQX1dpaWmpmOD6P74eoTArK+vgwYPBwcECgUAulytOZ2Vl5eDgwHHcuXPnBg0axF9/fX3979+son4PvxgVAAAAAADgi/jLrrdUxLDPzjVtjZ/myidGgUDw1VdfvX//fvr06RYWFoo2tbW1O3fuLCkp6datGyHkzJkz/Jhh6xippaXFd/XZs6iqqurp6TEM06NHj5MnT6akpBw5csTW1pYQ0q1bt+PHj7eOoISQysrKs2fPEkK6du2alpY2c+ZMSqmLiws/tmlpaXn+/PknT56EhYVlZ2eLxWJ+C5M/TIyKpyGVSvHrBwAAAAAAZMs/oBhd/MMQxU9w5ZuZmpqWlJT07t3748ePb9++ZRiGZf/HI7p48WK3bt3Wrl2rra3NcVxBQQF/nGGYTyfftp7jqq+vn5OT8+DBg7t379bW1m7YsEFFRSUjIyMvLy85ObmmpkbR+NWrVxzH6ejobNq0ydnZOTo6mj8eEBAQGBjId+vl5TVp0iSJROLo6BgSEiKXyzmOYxjmDwdpFeGzzZYqAAAAAAAAyJafwc8RJYQ0Nzf/fksNDQ2GYfjZpOrq6r6+vm/evHn//v2FCxesra0DAgIULSmlV69effr0qZGREcMw586de/nyJaVU8dn/8WRZ1tHRcfjw4XxoLCkpmT9/fnx8vKen59y5c2NiYiZPnuzl5bVr1y5PT8+ffvqJENLY2Egpff369cGDBwkhHTp0ePLkydWrV/kOnZyc4uLi7O3t+/fvLxQKw8PDtbW1tbS01q5dK5PJ+PWTf7i4VPE0/jCFAgAAAAAAIFv+35T1hwVR27VrRwgpLy/nF0MePny4vr6+rq7u4cOHu3fvHjhw4KcldkpKSiZOnDh58uQOHTqUl5ffvXuXUtp6F02BQBAREZGenn727NnDhw8LBAKO46KiotatW5eens7PemUYJi0t7cCBA6mpqWKxmBDy8OHDd+/e2dvbz58/39vbWzEoSggxMjLKz88PDAzs37+/uro6pfTgwYPm5uZRUVFjx45VVlYuKysjhOjr6//+zSqehiJ7AwAAAAAAIFv+JkXK4kPXZ/HzYA0MDAQCwZs3byilXl5e69at09DQMDQ0DAoKam5urq6uFggEbeLlixcvzpw5I5PJDh061LNnT74YrJaWliLW7tq1a9KkSQKBQCQSTZkyJTg4WEVFRVtbWyAQODs7X716taio6Ny5cx07dmRZ1snJac2aNXK5XCaTubi47Ny5k1J6//79/Px8vkOGYTw9PVNTU0tKSqRSqaWlZV1d3YwZMziOmz17Nl+L6M2bNwKBgK8Wy+8y8lmKbS1bJ2EAAAAAAABky88zMTFRZEt+l442VXbKysqWLFlCKRWJRKampnyZ1qlTp164cKFdu3abN28uKirq0qVLUlLS+fPnGYZRV1f/dB7pvn37ioqKbt68uWzZMj6tsSx7+vTpWbNmKeIowzC7d+92dHTMzc29c+dOfHx8bm7uvHnzysrK0tPTMzMzExMTm5ubly9fnpCQUFlZGRYWxl+wAr9DSUBAQHl5uUwmy87O1tXVPXv2bGVl5Zw5cxwcHBiGycvLMzExUVFRkclkISEhny0YSyl9//49/5ofrQUAAAAAAPgimN+qa/r/u+bmZrFY3NzczLJsaWlpu3btbt++3b179+Tk5Dt37ty+fTs3N5dSWlpaqq+vP3jw4MzMzNLSUkrpr7/+euLECWNj49LS0oyMDB8fn9DQ0B49eqxevXrmzJkymUxdXV0x+qdIjwYGBiEhIceOHRs8ePDGjRs/3QDz9evXY8aMsbGxuXfvXklJCZ88jYyM+My5ZMmSDRs2VFZWfvbrCA4OlkgkpqamEomksrJSLpdPnz598+bNa9asYRhGKBS6ubm1b9/ewcHh5s2bRUVFJ06cePr0aXh4OL8EVLFzZnl5ubGxMaVURUWlpqYG5XwAAAAAAOBL+cvub6mkpGRhYZGfn89x3Js3b9q1a9fc3GxqatrS0mJiYmJnZxcaGtqhQ4f379/r6+vb2trevHnzzZs31dXVM2fONDMzS01N9fPzU1NTU1dXF4lEAQEBXbp0cXJy2rdv39KlS+Pj41ufi1JaXl5uZmYWExNjamr6abDkE+Pjx48fP37MZ1GWZTmOKy0tLS0tZRhGT0/vt4KlhoaGurq6jY1NdXV1U1OThoaGWCy+fv36okWLkpKS7t69e+nSpeLi4vLy8tGjR1NKjY2Nly9ffufOHX9//+DgYDc3t9raWj09PTMzM37eLyHEwsLis7t0AgAAAAAAIFu21blzZ37J4vPnz11cXFxcXKZNmxYSEiIWi7/77jt/f3/yj21CXFxcCCG3b9+eMmXK999/HxYWpqurW1ZWZmVl1bFjx4qKChUVFX7aqq6ubkZGxqfn6t+/v7e39w8//JCamtpmRivv0KFDYrG4trbWyclp7ty59vb2WVlZYWFhhYWF/fr1Gzx4cL9+/RITEz+Nl4MHD1ZXV6+qqhIIBHp6esXFxXV1dcbGxvHx8d99952fn5+ysvKtW7cUu1/u37+/pKQkMjJSU1Pzhx9+KCwsVFNTKykpIYS8ePFC8WQ+LVAEAAAAAADwL/vLrrdkGKZbt2786+zsbEJIu3bttm7damJioqGhwde/IYRER0fL5XIPDw9CSGxsLMdxOTk5LMuWl5fX1NSUlZUlJSUtXLiwtLTU2Ni4srIyJSXlw4cP/+MJsuzSpUuvX7+uo6OzePFifhXl409oa2vn5OTEx8cnJycLBIK9e/caGRnl5OSkpaVdv35dV1c3Li5u1qxZbbbTFIlEzs7O/E4n/FxcHR2d8vLyqVOnurm5DRkypLi4mGXZa9euEUI8PDwopSkpKTk5OUePHn369Gl+fv779++Dg4P5qrBPnz7ln0z37t3x0wcAAAAAAGTLP6VXr178i8zMTH7N4fPnz6VSKZ/H+H0+5s+fz3Gcubm5o6Pj7du3Gxoa5s2b5+XlJRaLb9y4YWVlJRKJoqOj3dzcLl++3NLSMm/evNZDiwzDWFhYWFlZ8bVkzc3NExISpk6dqqen12ZgsKSkZPbs2bGxsR4eHtOmTTt37tzs2bNPnDjh7OysoqLCMAwfI83NzVt3PmLEiPz8fGVlZYFAUFlZaWJiUllZWVdXFxAQ0LFjx1u3bg0ePLiuru7mzZsODg4WFhZNTU3BwcGXL1/29fVlWZZhGF1d3Y0bNzIMQynlR1wppe7u7vjpAwAAAAAAsuWfzZZ8uZqUlBSZTMYHPEdHR3Nz84sXL+bm5g4YMGDNmjV8hdiJEydKJJL4+PgOHTqEhoYOHz68f//+r1+/FolEAwcOrK2tXbZsmVQqVdTFIf+YT9utW7fAwEDFQQsLi0OHDr179+7q1auzZ882Njbmj8vl8piYmD179pSVlc2YMSM2NraoqCg4OLh1b4GBgV27dlUcUVVVtbCwMDEx0dXVlcvlTU1Nly5dOnPmzKNHj3x8fHr27GliYsIwzI0bN+rr68ePH08pvXv37oYNG969e9c6oPLlbaVSaVpaGiFEJBL17NkTP30AAAAAAPiC/rJ1Yvn7cnFxSU9PJ4SkpaX16NGjtrZ29OjRc+fO9fT01NTUbJ3rXr9+bWNjM3r06FOnTqWlpZ09ezY9Pf3du3dWVlbdunVjWVZZWVlFRaWkpCQhIcHMzMzY2Jhl2SFDhgwcOJAPbwzDcBzHMIxEIiGEqKmpMQzT3Nx8+/bt7du3h4aGhoaGhoSEeHt7KysrU0obGxv5ANn6sy0tLampqTExMS0tLebm5tnZ2UZGRjU1NSkpKenp6fxNsSx77969Pn368Lc5efLkqKiovLw8S0vL1atXT5482draus3cWkLIo0eP3N3dKaXOzs6KkkL4AwAAAAAAgC/ir1zLh1Lap0+f9PR0hmEuX77co0cPTU3N3bt329nZVVRUhIaGPn782NjYeMaMGS4uLubm5sOHD79y5Uppaambm1uPHj1GjBihoqJy+/btoqKiDx8+8OOZycnJAwYMSEpKevTo0cePH1VUVCwtLRMTE1+9etWjR49Hjx6JRKKDBw8OHz48IiKCEKKsrOzn5+fj49Pc3Hz9+nXFDplSqXTAgAG5ubkzZ85saWlxdXV98OCBpqZm3759c3Nzz58/r6Sk5Orq6ujoGBUVlZWVpfgnAIZhfHx8FNN9y8rKLl++7O/vb2Fh0dzcHBUVpaurO3r06Pbt2zMMw6dHxcpS/iOenp6tR18BAAAAAAD+fX/xccurV68GBARwHGdjY5Obm8uP5lVUVLi7u9fV1Y0dO9bIyCg+Pn7btm3u7u6PHj3q3bv3ggULtm7dWltbe/v2bS0trblz53bs2DE3N1dZWdnKyqq2tlYsFru7uyckJGRkZPA1gSil/J4ifGBTVVV9/vy5iYnJ71/hnTt3Bg4cyF8n3wP/mt+hZNq0aUVFRba2trt27WpdeFYkEqWlpTk5ORFCOI5btmxZWFhYcnKym5tbbGzssWPHUlNTS0pKhgwZMm3aNGdn53fv3vGrK21tbQsKChiGuXLlytChQwnGLQEAAAAAANnyT2bLuro6U1PThoYGQkhqamqPHj0IIZs2bYqNjT179iwf/5qbm5ctW8ZHuCFDhiQnJz99+tTCwoIQcvfu3dDQ0KSkpK+//jozMzMrK4sQMnHixIqKCjMzMz09vaampt27d7fZdGTRokVbt279dJfLNmQyWb9+/R4+fKg4wrKsjY2NgYEBy7Jisbhjx47nz59/+/bt//22GGbWrFl79+7lY2FRUZGDg0OvXr3i4uLkcvn06dN/+ukngUBw9+7dqKio6OhoTU3NJ0+eaGlppaenu7m5UUo1NDSKi4s1NTWRLQEAAAAA4Ati/9q3p6GhMXLkSH5o8fz58/zB58+fnzx50tTUlA9XVVVV/DaYLMuGhIQ0NjZu2bKFb/nx40dlZWVbW9umpiZbW1u+n9OnT7e0tLAsu337dltb22XLlrVZ3Jiamnrs2LE/jL6rV6+ura3lM56BgYGrq+vs2bPHjh3r7++vp6enqqrK1wRqHSyNjY3Xrl2ryISbN29uampavHgxP2rq4uKSkJAgEokGDx589OjRd+/eBQcHi8VihmHOnTvHh+2RI0fywRIAAAAAAADZ8s9iGGbixIn860uXLvHVYi0tLZWUlPiDVVVVkyZNsrKy4nOjl5eXp6fniRMn+OKxAQEB8fHxEydOfPjwYYcOHfiPcBx39+7dgwcPSqXS+fPn+/n5OTs7tz5pcnIyP6T5O8GypaVFSUnp2bNnenp669at27Vrl6enp4mJiba29qVLl0QiUVRUVENDQ+tRZZZljxw5oqury/9vQUHB8ePH+/bt6+PjQyn95ZdfZs6cOWTIED55MgyjpKQUGBhICJHL5fxiy9ZPAwAAAAAAANnyn+Dl5WVjY0MIef78eVxcHKU0KCho8uTJc+bMmTJlipOTU1FR0aJFi+7du1dZWcmy7IEDB0Qi0TfffNPc3MzvWikQCBobGyUSiWLAkA+ihJCWlpbvvvtuw4YNbeaX7tq1a8mSJZTSNtNl+WhKCPHx8YmPj2cYZvTo0ba2thzHVVdX29ra7t69m2XZrKysNh8UCAS7d+8eNGgQf6Lm5uYpU6aIRKKff/5ZIBDcuXNn1apVW7du5Wf/8pSUlKysrAgh165de/HiBSHExsbGy8sLP3oAAAAAAEC2/KcpKSlNmjSJf71hwwZKafv27aOjo42NjZuamubOnZuWltahQ4c7d+7Mnz+fEGJlZRUSEpKWlrZlyxY+QE6YMCEiIkJJSemzCxTT0tL09fUdHR0VRyiliYmJFRUVv/766+nTpxVZVC6XU0p37Njx9u3b169fp6WlcRzHJ9gFCxYMGzbs+PHjOjo6mzdvzsvL+x9fEsvOmTNn1qxZigvYtm1bcnLy4sWLra2tKaUlJSVr167dt2+fjY3N8ePHZTIZx3H8xcvl8h9//JF/PXnyZKFQiB89AAAAAAB8efQvimvl7du3im0kz58/zx+Uy+Ucx8lkspcvX44dO1YgEISFhfFvSSQSDw8PNTW1mzdvyuVyvmVTU1NQUNCn8ZJhmAkTJvCzT1vT0NAQiUQTJkzIzMyMioqSyWSrVq2qqKiwt7fX0tJSVPpRVlbmJ+jq6ekJBIIbN25s2LChTf9BQUFNTU38tclkstu3b6upqfXt21cikfA3IpPJ5HL5hw8f1q5da2Bg0KNHj1WrVvEHz58/r6he+/bt29aPhQIAAAAAAHwhf/E6sYrXixYt2rNnDyHE2to6OztbSUmpqamJZdn4+Pjw8HAnJ6dz585lZWWJRCL+I+/fv3d1dZVIJA8ePLCzs+PjmVwuX7Ro0U8//fTpQxMKhfxizjbEYrGSkpKZmdnx48d79OjRvn37wsLC33rmPj4+J06ccHR0rKqqUoxYzp49e+fOnXwWpZTm5+f36dNHVVU1LS3NyMiopqbm4MGDjo6OQ4YM4Sv6VFZWLliwYNSoUSNHjpRKpY6OjvzWI3Pnzt21a1frbIw6sQAAAAAAgHHLf2LckuO4N2/eKIYuT5w4IZfLX79+PWLEiMWLF9fX1zs4OBw7dowfn1T8NyYmRigUOjs7V1VV8Qc5jmtpaVmyZMkf7i/SBsuyRkZGf5jllJWVXVxcFMV4hELhkiVLmpubFXdRU1PTvXt3oVB4+fJluVze1NQ0bNgwNzc3kUh09uxZRbP4+PiWlhaO406cOKEYtHzz5k2bZ4J/WQEAAAAAgC9FEBoa+neI0JqamuXl5ampqYSQ3NzcKVOm6Ovra2hoDBo06Pr162lpaaGhoY8fP75y5cqhQ4eeP3/eu3dva2trU1PTiIiIhISEgQMHamlpMQzDsuyAAQNsbW3v3bvX2Nj45wN8fX39HzaTy+UlJSV8sNTX1z906NDChQsVI5bFxcUjRozIyMj46aefxo8fTwjZuHFjz549d+/eXVZWVl5e3r9/f5ZlX79+7ezszLKsRCKZPHlyRUUFIWT27Nnjxo37dDYv/m0FAAAAAAC+iL9LtmQYpmvXrocPH25pafn48aNcLu/fv7+1tbWSktK4ceP09fVzc3NlMll4ePi9e/fMzMzMzc2NjIycnZ11dHSOHDkSHR3t5+enp6fHd+Xg4PD1118/e/aMr7/6xQ0dOvTatWs9e/bk4x/HcS9fvhwwYEBOTk5YWNjMmTMZhklJSdm/f394eLiJiUlZWdm+ffu2bdu2b9++jx8/Dh06lFIaGhp65coVQoiGhsbp06e1tLSQLQEAAAAA4D+Vuf4O6y0VRzZt2rRmzRqO45SVlR89euTg4NDQ0NDU1KStrZ2env7tt982NDRERka6ublRSj98+GBsbMxx3KZNm9atW9ehQ4crV67Y29srIplMJjt16tTatWuLioo+3WvkX8CyrJmZ2Zo1ayZPnsyyrOJEz549++qrr4qKitasWbNy5UpCSGlpqVwuNzQ0XLt27fbt27t167ZixYr6+vqqqqrAwEA9Pb0nT564u7s3NzezLLtu3brly5d/tgoR/gAAAAAAAOCLZbC/w3pLRQHYPn36MAzDMIyHh0dTU5NcLs/Ly/v2229VVFTGjBnz7t07vmVTU5O/v39KSgpfbfXixYt6enpisfjQoUOKtZeKPo8ePerm5tY6Df4LqdLNze3o0aN86VcFuVweHh4uFov19PQuXLjAH8nPzx80aFB5eTl/JVevXjU1Ne3atevu3bvr6urkcnlzc3OfPn349NinT582fWK9JQAAAAAAfHHs3ypIKysrnzhxQlNTkxDy4MGDNWvWUEqtra3t7Oy2bNly+vRpExMTPm+vXLnywYMH27dvv3fvHsdxw4cPv3v3rr6+/syZM8eMGVNWVqboU0VFZcqUKcnJyWlpabNmzTI0NGRZ9s9HSiMjozlz5qSlpSUnJ0+ZMkVFRUXxbnl5eWBgYHBwsL6+/p07d0aMGMEfF4lEGzdunDp1alNTEyFkyJAh6enp7du3r6mpUVNTo5SuXr06OTmZEKKpqXnixAllZWX8GwoAAAAAAPxH/Y3mxCrs27dvwYIFlFKBQBAVFTV8+HCpVJqVleXi4sKyrFwu37Zt24YNG86fP+/j4zNr1ix/f/+vvvqKEFJbW7t8+fLw8HA9Pb3ly5cHBQWpqam16VwqlWZnZz98+DA7O7uwsLC4uLi8vLyhoUEmkwmFQnV1dUNDQ1NTU0tLS0dHR3d3d0dHR4FA0CaOSiSSY8eObdy4sby8PCgoaMuWLWKxmFKamJioq6vr5OREKb1///6ZM2f27NkjFAoppdeuXfPx8RGJRNHR0ePHj5fJZAzD7N27d/bs2b/53WNOLAAAAAAAIFv+y9mS47jRo0dfvnyZEKKjo5OUlGRjY8MwDD+Se/z48dmzZw8ZMuTrr782MzOrrKz08fHJysoyMjIyMjKilCYnJ0+fPv358+dWVlZr1qwZO3asQCD4nZzGXwnHcX9m0qxMJjt//nxoaOjLly87dep06NChvn378td2+vTpmTNnhoWFTZs2je/nwoULOTk5q1ev5v+X/mP3y6qqKoZhAgICoqKifme7FGRLAAAAAAD4Uti/4z2z7NGjRy0sLAghHz9+HDFiRGVlJZ/NQkJC5syZ88MPP0RFRf38888SiWTAgAH8jiA+Pj6JiYkMw/Tt2zclJWXlypWlpaXffPONvb39/v376+rqfqucD7+88w/zZ319/YEDBzp37jx58uTi4uJly5alpqZ6eHgwDFNdXZ2amuri4rJ69erFixfz810JISNHjkxISFB0UllZOWrUqOrqaoZhLCwsDh8+/M/uwwkAAAAAAPCv+TuOW/Lv/vrrr0OHDq2pqSGEeHl5RUdHa2pqVlRUBAUF/fDDD927d8/JyXFwcGBZViqVjh079sOHD5s3b+ZLARFCOI4rKSk5cuRIZGRkQUGBmpra4MGDBw4c6OnpaW1t/SeHBCmlL168uHfv3q1bt+Li4urr662srMaNGzd9+nQTExP+1IcOHXr37l1JSUl4eDghZNmyZREREdeuXXN1dX39+nVoaOjx48cppXV1dSNGjEhISKCUamlpXb9+XbGFyW9+9xi3BAAAAAAAZMt/J1vyYmNjR44cKZPJCCF9+vS5cuWKWCxuaWmZO3cuIWTnzp0aGhqU0r179y5dujQpKal79+5t+mcYhuO4mzdvhoeHx8bGNjY2EkKMjY3d3Ny6devWsWNHfp9MDQ0NkUgklUrr6+vLysoKCwtfvXqVmZmZmppaWlrKMIyysrKfn19wcPCAAQMEAgHfOaV0wYIF7u7ukyZNam5uFolEDMNIpdIpU6bExcVNmjTp2bNnJ06cMDAwqKqqCggISEpKopSKRKKLFy/6+fn98XePbAkAAAAAAMiW/362pJRGRETMmDFDLpezLNulS5eLFy+am5s3NTUVFBQ4OjoSQrKysvr167dixYqQkJDWFXeeP38eHR0dEhKiOFdtbe39+/cfPHiQlpaWk5Pz4cOHNudSZDm+vYGBgYODg4uLi4eHR9++fcVisWLZ5P379z08PN6+fevk5PThwweRSNS6K5lMFhsb29DQ4OfnJxaL37x5M3LkyCdPnnAcJxQKf/7556CgoD/13SNbAgAAAAAAsuW/ny35ZocOHZo7d65cLieEWFtbx8bGdurUiS+fc/HixZ07d2ppacXExLReu/j06dPhw4fb2tpev36dD3v8u63TY3l5eWFhYVFRUUVFRUNDA8dxDMNoaGgYGBiYmJhYWVnp6+vz7RWRsq6u7vTp07du3WpqaoqMjHzy5Im3t/fbt28NDQ0V57W3txcKhYqzvHr1asiQIS9fvuTL3u7bt2/atGl/chMUZEsAAAAAYtnWMAAAIABJREFUAPhShH/3bM0w06dP//jx46pVqwghL1686Nev3+XLl11cXBiGcXd3V1FRGTVqFPlHoVdK6Zs3b7Zu3TphwoT8/Hy+k3v37q1fv37FihW+vr6KubIGBgaGhoY9e/b8wwD89OlTBweHR48efffdd8rKynFxcc3NzSoqKtbW1izLRkRE8EOm/HhmQUFBQEAAPxf30aNHAQEB79+/58+4bt266dOnIzECAAAAAMB/nyA0NBTxsm/fvoaGhgkJCTKZrKGhISoqSkdHx9nZWSwWBwYGPnr06NixY+/fv3d2ds7IyBg1atSqVaueP38ul8uHDx9OCDEzM1uzZs2LFy8mTZqUkZGxaNEiIyOjhoaGmJiYJ0+e5OfnS6VSQ0PDNqlPLpcvXbr0xo0bR44cGT58eMeOHQ0NDcPCwiZOnJicnFxYWNitWzeGYTZv3iyTydTU1B48eHDv3r2pU6eqq6tzHHf48OFvv/22srKSYRh1dfU9e/YsWLDgnwqWSKEAAAAAAPDFgtXffE5s6/b8MCBfXIdhmNGjRx84cEBHR4ef4CqTyR4+fHj16tWNGzfu37//5MmTw4cP3717NyEkPz8/JCTkxo0b2dnZ6urqP/zww4EDBxiGGTt2rIqKyuzZs9etW6enpxceHt565WR6evrIkSNfvHhRXFysq6urpaXV0tJiYWHRrl27IUOGcBy3ZcsWSmlUVNSpU6cEAsGYMWPGjh0rFApra2tnzpwZFRXF36OJiUl0dHT37t3/5FRYZEsAAAAAAPjiMG75f4OWqampv79/enr6u3fvKKU5OTmRkZHt27e3t7fX0NBQU1N7+/athYWFu7u7l5fX/fv327dv379/f0LI9evXPT09X716VVxcLBQKzczMHB0dGYY5ceKEpaVlUFDQ4MGDFy5cqKen16NHj9Yn3bFjx6VLl1RUVOzt7dXU1AQCgUQiSUhIOH/+vJ+f361bt6ysrBwdHSdMmDB+/PguXboQQs6fPz9y5Eh+i0uGYfr06XP58mX+dP/CLeN7BwAAAACAL4LFI2jNysoqISFhwYIF/Bjg27dvx48fP2zYsNzcXKFQOHjwYH7tZUpKSk5OjlgsJoRQSjMyMvr27fv1118fP348MTHR29ub762xsVFVVZUQoqen16tXr3v37rUeTTUy+j/s3V9o1fX/wPHz0o/RNjIkB0nN1TYTIwjxoj9sECJUF1JkVHbjTZe76CoU6rZA8sbuupXCC6NIMFakmBqUFHkTUcs5R4RB6JCcuLnX7+LwHeLv+6fO2c7nnM95PK7C5pnv1znbPs/P573zuffUqVNDQ0N79+4dGxubm5uLiNdee+3q1asfffTRoUOH3nvvvfn5+foH11t3586du3fvnpmZqdVqq1atev3110+cODE8POyJAwAAtGUbiYiiKA4cOPDBBx/09/fX3y12YmJi27Zte/funZ2drX/Y448//vHHH993332Li4uXLl2am5vr6+t7/vnn5+bmjh8/vn79+vqH/fXXX3feeWf9v69cubJ27drbPtcjjzxy+PDhc+fOzc/Pf/fdd5lZv7Z56NChvr6+I0eOrFmzJjOvXLmyb9++bdu2TUxM1O9l0t/ff/jw4XfffXfpPWMBAAC0ZdsV5ssvv3z27Nk9e/bU6+7GjRv79+/ftGnTvn37pqamMvPhhx9+9dVXI+Lnn3/evHnzTz/9dM8999R3ri7tNb127Vpvb29mfvvtt99///0rr7xy2zbUTz755NixY4uLixs2bNi0aVNEzM7Ovv/++59//vmuXbuKopiamtq7d+/IyMj+/ftv3LhRq9XWrFmzZ8+es2fP7tq1y6ZWAACgXTLKe/n89wf5+uuvx8fHz507t5Sdq1evfu6558bHx0dHR1evXl3/RPXLiVNTU7/99tvY2FitVvv000/Hx8c3b9780EMPnTlz5q233nrhhRduq8HJycl33nln48aNL7300pYtW5b+/ObNm2fOnDl48ODRo0eXtsXWarWtW7cePHjwySefXJaqlKYAAIC2bEVb1i0sLBw7duzA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vvvuu3NzcwsLCx2ftV6vz8zMTEhIED/u2LHjvffeUxRl1KhRjzzyiKIoX3311bvvviuW+vj4GAyGxMREu43s3LnznXfeEY91Ol1mZmaPHj0aGhpycnLCwsKmTJmi7rx79+7169eLx15eXgaDoby8XN2SmZnZs2dPs9mck5MTFBQ0depUschsNufm5gYGBsqWG9m7d+9bb70lHru7u2dmZtbV1b377rsGg6Gurm7t2rWKogwbNmzGjBmdrn7gwIG//vWv4rGrq6vBYOjXr59dn7///e95eXk//K3OxSUzM9Nqta5ZsyYzMzMlJUUuam9vz83NdXFxmTlzpqIohw4dysvLy8zMHDhwYEdHR05OzrFjxzQaTWZmZmpqKn/OAPyDbADwT5Kfn6/RaH7kh88DDzzQ2tpqs9k2b97s4uLy/vvviwfvvfee2Fp6evp9991ntVrVu/jkk0/c3Nw63eA999zT1NRks9m2bNni7u6+fv36zz77zMPDY/369WLdRx999EYHs27dOrmLbdu2eXt7y0Vr164V7VOnTh09enRdXd20adPk0t/85je1tbXTp0933ObIkSNNJpPjWXr88cdFh9WrVzsu3bVrV0BAgKIoI0aMqKysVC/avXt3YGCg3H5OTo5oz8zMFC2vv/66aDEYDMOGDSstLbXZbHv37g0JCVEUZejQoSUlJXJrTzzxhN0B/+UvfxGLZs2aJRsHDx58/fp1x+N86qmnBg0adO3atT/96U9221mxYoXoM3v2bMfTMnDgwMuXL9tstiNHjnTp0kW2L1u2zG4X8+bNE4tefPHFY8eOde3aVVGUfv36FRYWzp8/326zS5YsEWtlZWXd6FV+/vnn5cZPnTol442dnj17nj171maznT59OikpSb2oR48eZ86cWbhwoXggt/bcc8/JPomJid99953NZjt79mzPnj0XLFhwo9+X559/Xqzy7LPPnj9/vk+fPup9xcXFnThxQnZesmSJaJ8/f75sLCoq6t+/v3qt2NjYo0ePLlu2TDxQ7+7SpUspKSlz5syxO4yXXnrJ7gzMnj1bLr169eott9zypz/96dq1a4MGDRLZ++DBgzab7fr164MHD3Y8gbNmzTIajeI/RI5CQ0P37dsnt//qq6+KdoPBIFpee+012Tk4OPjrr792PHU5OTmyT2Bg4O7du202W2Vl5YgRI37/+9/bdV69erXs7Ofn99VXX7355pvqrLtjxw6bzWYymUaOHDljxgy5Yk1NzahRo6ZPn/6DH30iPQre3t7btm176623vLy8tm7dum7dOtE+ZcqUG60ug66Iplu2bHHsI7P0zbm6un788cfvvfeei4vL5s2b1VtobW194IEHJk6cKH7csGGDk5PThx9+aLPZ2traHnzwQUVRNBpNfn4+f8sA/MOoiQUAAAAA/FTUxAL4D3Hq1ClRZKvX61etWlVQUNDW1rZy5cqCggJRinbw4MGePXtmZGRs2LDh0KFD6nXXr19fX1+fkZHh7u4uG5OTkzMyMoqKisTqBw4caGpqeuKJJ+Lj42UBW0REhIeHR6fHc/bs2VmzZmm12qSkpIyMjM2bN1dWVmZkZMgO77333vHjx8XjxMTEjIwMb2/vhISElStXWq3W8PBw9eXT999///jx44sWLXJ1dRUtQ4YMOX/+fF5eXmhoqDieK1eurFixQuyisLDw6aef9vDwKCsrq6+vVx9YYWFhXl5eYGDg3Llz8/Ly6urq7I78t7/9rVarFYsuXrw4d+7cxx57TFTbql26dGnevHmJiYnybAjXrl0TZywqKuqZZ57Jy8szmUx263744YcHDhyYPXu2VqsVLTcvw4uOjl6yZElDQ4PZbF61atWBAweioqIyMjKCg4NFh5SUlGvXruXl5W3bts1u3fvuu2/s2LGKohiNxkWLFmVkZISGhsqlERERoqW4uDgvL6+srEwuCg8PX7Ro0TvvvCPrb0tKShYuXHj58mXxwM/PLywsTP2aOvr888/tKm/Hjh17//33iwfiknJxcfHrr78+ZcoUWUG9devWPXv2PP/88wEBAcHBwTffhVpVVdWSJUt69eq1dOlSWU+rKMr27ds/++yz9PT0G11OVBRl1KhRd9xxR6eFlzt27CgtLb106ZKiKDU1NcuWLXv44YfHjBkzb968999/Pz8/X1GUO++887e//a2iKD179tTr9fPmzSsvLxer79q1a/v27RkZGXFxcS0tLZs3bzYajbLsVti9e7d424SEhIh31O7du3fv3i2W1tfX5+XlXbhwQf5yeXt7Z2RkJCQkuLu7i0vQ3t7es2fPPnnypCw99fLyEqfO09MzIyMjKSlJ/D5GRET85S9/ycvLKygokAfg6en51FNPySr0ffv2vfXWW2fPnpXvZ0VRPDw8MjIy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nnjC7gz85S9/OXDggJgzdsiQIUaj8Sav9VNPPTVo0KBr167Jlj/96U9iOytWrHDsf/jwYfV0qcuXL3fsc/To0djYWDnDzbx580TnF1988dixY127dhWBobCw8CYHlpWVJdZ64YUX7BY9++yzYtHixYvt5vJx3E52dnZycvL333+fnZ0t1lq4cKFYtHDhwh49epw5c+bmvw5iLh/1GU5ISDh16pTjf0CeffbZ8+fP9+nTR1GU+Pj4kydPdrrBwsLCfv36zZ8/X7aIuXzE/x3E1DvCsmXLYmNjjx49arPZLl26JP5LIsyZM8duCh+16Ojob775Rr1TMZePuk9kZOTBgwdtNtv169cHDx785JNPys5Go3HIkCGzZs1yPPji4mK7/1CEhobu27dPzuVjMBjsVnn99deDg4O//vprx63l5OTI7QQGBu7evTs3N1f8+Pvf/96u8+rVq+2e5uOPPy6XmkymkSNHKoqi1+s7nURHTuozbdo00bJmzRq5KZ1O98UXX6xdu9bxZHp5eW3dunXdunXixylTpojV3377bU9Pz88//1zuYv369Y6ru7u7b9myhbl8APyyUBMLAAAAAPipqIkF8GsUHx+flpYm5vyULeppMB19+umnbm5uaWlpX3755cmTJxVFiYyMjIyMXLlypePV2uPHj9fU1CxbtszDw6Nr165paWmd3lYxNjZ27ty5+fn5ly5dWr58uaenp7jqaNctJydn7NixQUFB+fn5R44cke1XrlxZsWKF+r6IMTExaWlp6nVjYmKefvppMf/nm2++KQ/1m2++EQ/uuusucWGqpqZmx44dM2bM2L59+7Vr11555RX15KWRkZFpaWnyBg+Koly/fn3lypWyRafTTZs2LT8/3/Fp7tixIz8/325y3eLiYnXjyJEju3btOmvWLFHALISFhaWlpVkslry8PJPJpChKaWnpa6+9Ji72CqGhoWlpaQEBAaWlpfn5+a6urgsXLlQURVy5zc/PFysqirJv376QkJC0tDRRsiuUl5fn5ORMmDBh+PDh6sMbPnx4SEhIUFDQ8OHD5UnLzc1NS0sTPT/44AP16x4YGJiWlhYSElJZWZmfn5+YmCgqWm+77TZZmhsYGCiuIdvZt2+fs7Pz/ffff//99wcEBIgLet9++21aWlpYWFh1dXV+fn5ZWZnJZCotLd2/f/9zzz2nKMrQoUPl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" />
          <div class="t m0 x1 h2 y1 ff1 fs0 fc0 sc0 ls1 wsc">Form I-90 02/27/17 N</div>
          <div class="t m0 x2 h3 y2 ff2 fs1 fc0 sc0 ls1 wsc">For </div>
          <div class="t m0 x3 h3 y3 ff2 fs1 fc0 sc0 ls1 wsc">USCIS </div>
          <div class="t m0 x2 h3 y4 ff2 fs1 fc0 sc0 ls1 wsc">Use </div>
          <div class="t m0 x4 h3 y5 ff2 fs1 fc0 sc0 ls1">Only</div>
          <div class="t m0 x5 h4 y6 ff2 fs2 fc0 sc0 ls1 wsc"> Application to Replace Permanent Resident Card </div>
          <div class="t m0 x6 h5 y7 ff2 fs3 fc0 sc0 ls1 wsc">Department of Homeland Security </div>
          <div class="t m0 x7 h6 y8 ff1 fs3 fc0 sc0 ls1 wsc">U.S. Citizenship and Immigration Services</div>
          <div class="t m0 x8 h5 y9 ff2 fs3 fc0 sc0 ls1 wsc">USCIS </div>
          <div class="t m0 x9 h5 ya ff2 fs3 fc0 sc0 ls1 wsc">Form I-90 </div>
          <div class="t m0 xa h2 yb ff2 fs4 fc0 sc0 ls1 wsc"> <span class="ff1 fs0">OMB No. 1615-0082 </span></div>
          <div class="t m0 xb h2 yc ff1 fs0 fc0 sc0 ls1 wsc">Expires 07/31/2019</div>
          <div class="t m0 xc h3 yd ff2 fs1 fc0 sc0 ls1 wsc">START HERE - Type or print in black ink.<span class="_ _0"></span><span class="ff3">►</span></div>
          <div class="t m0 x3 h7 ye ff2 fs5 fc0 sc0 ls1 wsc">Part 1. Information About You</div>
          <div class="t m0 xd h8 yf ff1 fs1 fc0 sc0 ls1 wsc">Alien Registration Number (A-Number)</div>
          <div class="t m0 x1 h9 y10 ff4 fs5 fc0 sc0 ls1 wsc"> Your Full Name</div>
          <div class="t m0 x1 h3 y11 ff2 fs1 fc0 sc0 ls1 wsc">NOTE: <span class="ff1"> Your card will be issued in this name.</span></div>
          <div class="t m0 x1 h3 y12 ff2 fs1 fc0 sc0 ls1 ws0">3.a.<span class="_"> </span><span class="ff1 wsc">Family Name </span></div>
          <div class="t m0 xd h8 y13 ff1 fs1 fc0 sc0 ls1 wsc">(Last Name) </div>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 338px;left: 120px;"> @InformationAboutYou.LastName </p>
          <div class="t m0 x1 h3 y14 ff2 fs1 fc0 sc0 ls1 wsc">3.b. <span class="_ _1"> </span><span class="ff1">Given Name </span></div>
          <div class="t m0 xd h8 y15 ff1 fs1 fc0 sc0 ls1 wsc">(First Name) </div>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 314px;left: 120px;"> @InformationAboutYou.FirstName </p>
          <div class="t m0 x1 h3 y16 ff2 fs1 fc0 sc0 ls1">3.c.<span class="ff1 wsc"> </span></div>
          <div class="t m0 x1 h3 y17 ff2 fs1 fc0 sc0 ls1">4.</div>
          <div class="t m0 xd h8 y18 ff1 fs1 fc0 sc0 ls1 wsc">Middle Name</div>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 290px;left: 120px;"> @InformationAboutYou.MiddleName </p>
          <div class="t m0 xd h8 y19 ff1 fs1 fc0 sc0 ls1 wsc">Has your name legally changed since the issuance of your </div>
          <div class="t m0 xd h8 y1a ff1 fs1 fc0 sc0 ls1 wsc">Permanent Resident Card?</div>
          <div class="t m0 xe h3 y1b ff1 fs1 fc0 sc0 ls1 wsc">Yes (Proceed to <span class="ff2">Item Numbers</span> <span class="ff2">5.a. - 5.c.</span>)</div>
          <div class="t m0 xe h3 y1c ff1 fs1 fc0 sc0 ls1 wsc">No (Proceed to <span class="ff2">Item Numbers</span> <span class="ff2">6.a. - 6.i.</span>)</div>
          <div class="t m0 xe h8 y1d ff1 fs1 fc0 sc0 ls1 wsc">N/A - I never received my previous card. </div>
          <div class="t m0 xe h3 y1e ff1 fs1 fc0 sc0 ls1 wsc">(Proceed to <span class="ff2">Item Numbers</span> <span class="ff2">6.a. - 6.i.</span>)</div>
          <div class="t m0 x1 h3 y1f ff2 fs1 fc0 sc0 ls1">1.</div>
          <div class="t m0 xf h8 y20 ff1 fs1 fc0 sc0 ls1 wsc">Str<span class="_ _2"></span>eet<span class="_ _2"></span> Nu<span class="_ _2"></span>mbe<span class="_ _2"></span>r </div>
          <div class="t m0 xf h8 y21 ff1 fs1 fc0 sc0 ls1 wsc">and<span class="_ _2"></span> Na<span class="_ _2"></span>me</div>
          <div class="t m1 x10 h9 y22 ff4 fs5 fc0 sc0 ls1 wsc"> Mailing Address</div>
          <div class="t m0 x10 h3 y23 ff2 fs1 fc0 sc0 ls1 wsc">6.a. </div>
          <div class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc">In<span class="_ _2"></span> <span class="_ _2"></span>Ca<span class="_ _2"></span>r<span class="_ _2"></span>e <span class="_ _2"></span>O<span class="_ _2"></span>f <span class="_ _2"></span>N<span class="_ _2"></span>am<span class="_ _2"></span>e </div>
          <p class="ct cm2 cxf ch8  cff1 cfs1 cfc0 csc0 cls1 cwsc" style="bottom: 445px;left: 346px;"> @MailingAddress.InCareOfName </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 421px;left: 408px;"> @MailingAddress.StreetNoAndName </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 398px;left: 341px;"> @MailingAddress.Apt </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 397px;left: 383px;"> @MailingAddress.Ste </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 397px;left: 426px;"> @MailingAddress.Flr </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 397px;left: 466px;"> @MailingAddress.Number </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 375px;left: 408px;"> @MailingAddress.CityOrTown </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 350px;left: 364px;"> @MailingAddress.State </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 350px;left: 473px;"> @MailingAddress.ZipCode </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 326px;left: 410px;"> @MailingAddress.Province </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 302px;left: 410px;"> @MailingAddress.PostalCode </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 266px;left: 343px;"> @MailingAddress.Country </p>
          <div class="t m0 x10 h3 y24 ff2 fs1 fc0 sc0 ls1 wsc">6.b. </div>
          <div class="t m0 x10 h3 y25 ff2 fs1 fc0 sc0 ls1 ws1" style=" left: 217px; top: 297px;">
            6.c.<span class="_"> </span><span class="ff1 ws2 v1">Apt.<span class="_"> </span>Flr.<span class="_ _3"></span>Ste.</span>
          </div>
          <div class="t m0 x10 h3 y26 ff2 fs1 fc0 sc0 ls1 wsc">
            6.d. <span class="ff1"> <span class="_ _4"> </span>City or Town</span>
          </div>
          <div class="t m0 x10 h3 y27 ff2 fs1 fc0 sc0 ls1 ws3">6.h.<span class="_"> </span><span class="ff1 wsc v0">Postal Code </span></div>
          <div class="t m0 x10 h3 y28 ff2 fs1 fc0 sc0 ls1 ws4">6.i.<span class="_"> </span><span class="ff1 wsc">Country </span></div>
          <div class="t m0 x10 h3 y29 ff2 fs1 fc0 sc0 ls1 wsc">6.e. <span class="_ _5"> </span><span class="ff1 ws5 v0">State<span class="_"> </span></span><span class="ws6">6.f.<span class="_"> </span></span><span class="ff1 v0">ZIP Code</span></div>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 195px;left: 408px;"> @PhysicalAddress.StreetNoAndName </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 170px;left: 341px;"> @PhysicalAddress.Apt </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 170px;left: 383px;"> @PhysicalAddress.Ste  </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 170px;left: 425px;"> @PhysicalAddress.Flr </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 169px;left: 466px;"> @PhysicalAddress.Number </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 146px;left: 408px;"> @PhysicalAddress.CityOrTown </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 122px;left: 364px;"> @PhysicalAddress.State </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 122px;left: 473px;"> @PhysicalAddress.ZipCode </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 98px;left: 410px;">  @PhysicalAddress.Province </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 74px;left: 410px;">  @PhysicalAddress.PostalCode </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 38px;left: 343px;">  @PhysicalAddress.Country </p>
          <span class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="left: 167px; top: 265px; letter-spacing: 39px; ">@AlienRegistrationNo </span>
          <span class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="left: 125px; top: 301px; letter-spacing: 39px;">@USCISAccountNo </span>

          <div class="t m0 x11 h3 y2a ff2 fs1 fc0 sc0 ls1 wsc">Class of Admission</div>
          <div class="t m2 x11 h3 y2b ff2 fs1 fc0 sc0 ls1 wsc">Applicant Interviewed</div>
          <div class="t m0 x12 h3 y2b ff2 fs1 fc0 sc0 ls1 wsc">Action Block<span class="_ _6"></span>Receipt</div>
          <div class="t m0 xe h3 y2c ff2 fs1 fc0 sc0 ls1">Date:</div>
          <div class="t m0 x13 h3 y5 ff2 fs1 fc0 sc0 ls1">Remarks</div>
          <div class="t m0 x1 h3 y2d ff2 fs1 fc0 sc0 ls1 wsc">Provide your name exactly as it is printed on your current </div>
          <div class="t m0 x1 h3 y2e ff2 fs1 fc0 sc0 ls1 wsc">Permanent Resident Card.</div>
          <div class="t m0 x1 h3 y2f ff2 fs1 fc0 sc0 ls1 wsc">NOTE: <span class="ff1">Attach all evidence of your legal name change with </span></div>
          <div class="t m0 x1 h8 y30 ff1 fs1 fc0 sc0 ls1 wsc">this application.</div>
          <div class="t m0 x1 h3 y31 ff2 fs1 fc0 sc0 ls1 ws0">5.a.<span class="_"> </span><span class="ff1 wsc">Family Name </span></div>
          <div class="t m0 xd h8 y32 ff1 fs1 fc0 sc0 ls1 wsc">(Last Name) </div>
          <div class="t m0 x1 h3 y33 ff2 fs1 fc0 sc0 ls1 wsc">5.b. <span class="_ _1"> </span><span class="ff1">Given Name </span></div>
          <div class="t m0 xd h8 y34 ff1 fs1 fc0 sc0 ls1 wsc">(First Name) </div>
          <div class="t m0 x1 h3 y35 ff2 fs1 fc0 sc0 ls1">
            5.c.<span class="ff1 ls0 wsc"> <span class="ls1 v0">Middle Name</span></span>
          </div>
          <div class="t m0 xd h3 y36 ff1 fs1 fc0 sc0 ls1 wsc">USCIS Online Account Number (if any)<span class="_ _7"></span><span class="ff2">2.</span></div>
          <div class="t m0 x14 ha y37 ff3 fs1 fc0 sc0 ls1">►  </div>
          <div class="t m0 x10 h3 y38 ff2 fs1 fc0 sc0 ls1 ws7">6.g.<span class="_"> </span><span class="ff1 v0">Province</span></div>
          <div class="t m0 x15 h2 y1 ff1 fs0 fc0 sc0 ls1 wsc">Page 1 of 7</div>
          <div class="t m0 x16 h5 y39 ff2 fs3 fc0 sc0 ls1">A-</div>
          <div class="t m0 x10 h9 y3a ff4 fs5 fc0 sc0 ls1 wsc"> Physical Address </div>
          <div class="t m0 x10 h3 y3b ff2 fs1 fc0 sc0 ls1 wsc" style=" left: 217px; bottom: 253px; ">
            7.a. <span class="_ _8"> </span><span class="ff1">Str<span class="_ _2"></span>eet<span class="_ _2"></span> Nu<span class="_ _2"></span>mbe<span class="_ _2"></span>r </span>
          </div>
          <div class="t m0 xf h8 y3c ff1 fs1 fc0 sc0 ls1 wsc">and<span class="_ _2"></span> Na<span class="_ _2"></span>me</div>
          <div class="t m0 x10 h3 y3d ff2 fs1 fc0 sc0 ls1 wsc" style=" left: 217px; bottom: 200px;">
            7.c. <span class="ff1"> <span class="_ _9"> </span>City or Town</span>
          </div>
          <div class="t m0 x10 h3 y3e ff2 fs1 fc0 sc0 ls1 ws8" style="left: 217px; bottom: 177px;">
            7.d.<span class="_"> </span><span class="ff1 ws5 v0">State<span class="_"> </span></span><span class="ws9">7.e.<span class="_"> </span><span class="ff1 wsc v0">ZIP Code</span></span>
          </div>
          <div class="t m0 x10 h3 y3f ff2 fs1 fc0 sc0 ls1 wsa" style=" left: 217px; bottom: 226px;">
            7.b.<span class="_"> </span><span class="ff1 wsb v1">Apt.<span class="_"> </span>Flr.<span class="_ _3"></span>Ste.</span>
          </div>
          <div class="t m0 x10 h8 y40 ff1 fs1 fc0 sc0 ls1 wsc">Provide this information only if different than mailing address.</div>
          <div class="t m0 xf h3 y41 ff1 fs1 fc0 sc0 ls1 wsc">Country <span class="_ _a"></span><span class="ff2">7.h.</span></div>
          <div class="t m0 xf h8 y42 ff1 fs1 fc0 sc0 ls1 wsc">Postal Code </div>
          <div class="t m0 x10 h3 y43 ff2 fs1 fc0 sc0 ls1">7.g.</div>
          <div class="t m0 xf h8 y44 ff1 fs1 fc0 sc0 ls1">Province</div>
          <div class="t m0 x10 h3 y45 ff2 fs1 fc0 sc0 ls1">7.f.</div>
          <div class="t m0 x17 hb y46 ff5 fs4 fc1 sc0 ls1 wsc">(USPS ZIP Code Lookup)</div>
          <a class="l" href="https://tools.usps.com/go/ZipLookupAction_input">
            <div class="d m3" style="border-style:none;position:absolute;left:483.563000px;bottom:526.271000px;width:82.880000px;height:10.640000px;background-color:rgba(255,255,255,0.000001);"></div>
          </a>
        </div>
        <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
      </div>
      <div id="pf2" class="pf w0 h0" data-page-no="2">
        <div class="pc pc2 w0 h0">
          <img class="bi x0 y0 w1 h1" alt="" src="data:image/png;base64,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nqXJkyeHC9x///0Ne//2t7+1atUqCILTTjtt27ZtsV1vvPFG69ato+0XFhaG7Xl5eWHLH//4x7AlPz//pJNO2rJlS11d3aJFizIyMoIgGDJkyObNm6OtXX755fUO+J577gm7rrjiiqjxhBNO2LBhQ8PjvOqqqwYNGrR+/fqrr7663nbuvPPOcJlrrrmm4WkZMGDAmjVr6urqlixZ0qVLl6j9N7/5Tb1dXH/99WHXHXfc8fHHHx9xxBFBEBx33HHffPPNDTfcUG+zt99+e7hWQUHBoV7lX/3qV9HGly1bFsWbenr37r1ixYq6urrPP/+8Z8+esV1HH330F198MXXq1PBBtLVbb701WiY7O3v58uV1dXUrVqzo3bv3L3/5y0P9vvzqV78KV7npppu++uqrY489NnZfRx111CeffBItfPvtt4ftN9xwQ9S4atWqfv36xa7VtWvXjz766De/+U34IHZ3q1ev7t+//3XXXVfvMH73u9/VOwPXXHNN1Ltu3bof/OAHV1999fr16wcNGhRm7/fee6+urm7Dhg0nnHBCwxN4xRVXbNy4MfyGqKF27dq9/fbb0fbvvffesD0/Pz9s+cMf/hAt3LZt27feeqvhqSssLIyWad269RtvvFFXV7dt27bTTjttypQp9Ra+//77o4Vbtmz517/+9YEHHojNuq+99lpdXV1ZWdnpp58+adKkaMXy8vIzzjhj4sSJf/dPX5geQykpKS+//PKf/vSnZs2avfTSSw8//HDYfvHFFx9q9SjohtF04cKFDZeJsvThJSUlPfvss3Pnzk1MTHzmmWdit1BbW3vuueeOGTMm/HHevHnx8fFPPfVUXV3dvn37zjvvvCAI4uLiFixY4H8Z8N+mJhYAAIDvS00s8G9i2bJlYZFtWlrajBkzioqK9u3bd/fddxcVFYWlaO+9917v3r1zc3PnzZv3/vvvx647Z86cysrK3Nzc5OTkqLFXr165ubmrVq0KV3/nnXd27959+eWXd+vWLSpg69ChQ5MmTQ56PCtWrLjiiisaN27cs2fP3NzcZ555Ztu2bbm5udECc+fOXbp0afg4Ozs7Nzc3JSWlR48ed999d3V1dfv27cPLp0VFRbNmzdq1a1dqauptt92WlJQUrrJ27drwwLKyssLjWbt27Z133hm7iyAIunXrdtdddz388MMrVqy49tprmzZtetRRR+Xm5l5wwQXJycmzZs360Y9+NGzYsCAIBg0atGrVqlmzZoUVtqFvv/32F7/4RWxl7xFHHBG7i5ycnLBkccGCBX/961/DB1999VUQBJ06dbrxxhtnzZpVVlbWpUuXyZMnt27deteuXXfeeWdNTc22bdtKS0uj7Tz99NNhdeV55503YsSIsLFz5865ubm7d+/+9a9/HVXPHtSzzz67Zs2aIAg6duwYvTr1bNy48bbbbsvNzW3Xrl3D3vbt2+fm5mZmZrZs2bJdu3bPP//83/72tylTpkSv78KFC995552pU6f27t371ltvbd++fbTuyJEjox/37Nkze/bsYcOGde/evd4utmzZMmvWrE2bNoU/fvrpp+GDl156qaKi4uKLL27WrFlxcfGsWbP69Olz0UUXderUKQiCsOWFF174Lr8FpaWlt99+e58+faZPnx7W05aWls6aNWvt2rWNGjUaN25c7OXEsCsqIT7jjDNycnLC47z++utzc3PDa8VBELz22mtbtmxZvXp1EATl5eW/+c1vfvrTn4abGjZs2AUXXBB7DFu3br3uuuvCV7NFixa5ubnr1q178sknD3/kb7zxRvh+/vLLL8OWU089NScn5/nnn9+0adPIkSNnzZr19ddfp6am5ubmnnrqqdGrnJycfKhL0Idy8sknR6vv27fvlVde2bJly9lnnx0Ewdtvvx1VrtbU1KxYsSIqS168eHF48XDIkCGHKYLYu3fvvffeu3v37oZd1dXVs2bNSk1NveSSS6KWBx98cPPmzdHxJCQkHHPMMf6eA/9buXQL/HvUxMZ+0N+9e/f48ePPOuusqqqq8ePHR11nnnnmrl27Dvq5cMSIETt37oytif3Rj35UWVnZ8Far2bNn13viB62JjYTFsZMnTx42bNj27dujmthYQ4cOLS0tPehZjUphTz311JKSkqg9vGkqiCmFzcvLO/nkk7du3RpbExv6+c9/Hu0rKo5dvHhxZmbmjBkzosXeeeed2Mh0UGEpbFQTG6170OLYDz74oHPnzkFMKeyHH34YfVg/qKg49vrrr+/Xr9+qVaui4tjg0DWxkV//+teHen/edNNNxxxzTFFR0UFrYqNS2NAtt9zSq1evL7/8MmqZOnVquOTUqVMP81sQlcI2rIlduXJlnz59DnrY3bp1+/TTT+vq6sLi2IKCgmitr7/+um/fvtGSh6+J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1q1bH/SyZxAEDXcaSktLC9cKL6eUlJSUlZVt3779wIEDB91OTU1NeJk0lJSUFF1LjDZ4qGeRlpbWpk2b8AN0tJ2uXbu2bdt2//794bOoqqpq3LhxeAFn7dq1sZ+2W7RoUW9fsR/xw9UTEhLCZVJTU6OuaPW0tLTS0tJwyUNp1KhRu3btotUbdnXo0KG4uHj79u27du2K7crIyOjQoUNJSUliYuLOnTsPmvD/G/bt21dSUhLbEp2EkpKSffv2Rcsc5nkd5nhSU1PDDTZv3rxe165du2KfY7hwu3btGjVqFHXFXt9LTExs27Zthw4dqqurDzrYVbj64Z9v7E7rZcuUlJR6b4CEhITwq4fa2trYi7FBEOzfv79du3aNGzcO815paen+/fvrrV5VVbV169bowni4i8zMzHCt2L20adMmKSkp9p0fJcm/+46KxMfHt27d+qDv4bArCILy8vJ6mbN9+/ax3zdFLbt3746uVKemplZXV8fuYufOncnJyc2aNcvMzKyqqor9JitcpnHjxg0Pe8+ePdFfpENd2Af4/5/7LQEAAJAtAQAA+FdTEwv87zN//vy+ffvecsstcXFxtbW1t91225FHHhkXFzdt2rSGC59//vnHH398+KCuru7xxx+vra2Ner/66qtbb701KSmpR48eY8eOjUryzjvvvNGjR//duTQP5Zxzzhk4cGC9xqysrKhkNwiC5557rn///ldfffXAgQPT09NvvvnmvXv3ZmVlNW3a9Lnnnvvwww/DxRISEq688soXXnihpKRk3LhxUUXuoEGDwgcLFy58//33gyAYNWpUdEvnmjVrpk+fHi189tlnd+nS5cYbb4zKF1944YW1a9fecccdrVq1mj59ehAE5eXlDzzwwNixYxcvXvzkk0+GJZedO3ceO3bsiSeeeKhneuaZZ4YlhZWVlffdd9+4ceO+4ynq0KHD2LFjY29+a9euXeydnEEQbNq06a677srIyMjLyzv8vYKvvvrqk08+uX379jPOOOO000471GL79+9/9NFHhw0bFh5zZNiwYWPGjGnTpk1sS0VFxbx587Zt2xY1FhcXz5s3LwiCK6+8sm3btlH70KFD602NGJ2x0047Lbx37o033vjss8/GjRsX1aYOHjy44RG2bt365z//eWwtbmlpaXhbb3p6en5+fnQTbPRan3zyyWPGjAknJm3ZsmVeXl6XLl3KysrmzZu3adOmuLi4UaNGnXjiiWVlZY8//vgRRxwxYsSIIAjefvvtV1555eyzzz733HMbHkZqamrsWEGLFy++8cYbYxdYsmRJ8+bNx44du2HDhugG19TU1HHjxp111lmx2xk7dmzLli3rrf7xxx/X2+P777//hz/84YwzzmjRosWLL74Y2zVo0KDwLRoEQdOmTbt27fr++++/8MILQ4cO/eEPfxi2f/DBBwsXLjzU67579+4//elPr7/+epMmTcaNG3fUUUfVW2DJkiXPPffcySefnJKSEt37mpycfMkll3z99dfRwcfFxQ0ZMuTUU0+NVmzUqFG3bt02bdpUXV09Z86ct99+u6am5uuvv960adPtt98+aNCgpk2bPv300/V2l5SUNHbs2Ggoo08++eSpp54KH9fW1j766KPvvfdeYmLiuHHjevbs6Q8+IFsC/AO9+OKLcXFx8+fPT05OXrhw4ejRox988MGWLVuOHj264a1K2dnZYbYcOXJkXFzcU089FZstV69e/fvf/z4IghEjRpx//vlRtjzrrLMuuOCC//YRjhgxYvLkyYdf5tVXX62trZ0/f344JmQ4ME/UFQ1zcuqpp86fP3/Tpk0rV6684oorYvNP6LXXXps5c2aY1qK8sXHjxj/+8Y/RMpmZmYMHD7788sujlq1bt77//vuFhYUzZsy44oorwrz0+uuvn3322a+//vrcuXOjBJifn3/QsVujDDZs2LAgCK655ppXX3115MiR3/EUZWZmXnbZZfVGH62nuLj4gQceuOOOOy699NLDb23RokV//vOfgyA45ZRT6sWYWMuWLRs9enRycvKPf/zj2PaTTz554sSJ9VrS09Nfe+212GxZWlr60EMP5eTkRCMbhYYMGdJwpytXrozt2rdv34YNGyZMmHDMMccc5omkp6dPmDAhtuWbb7554403wq565yEcg/SEE0742c9+Fra0bNnykksuCd/Yc+bMWbp0aZcuXebPnz9gwIA1a9bMmTPntNNOC7Plhx9+OG/evPnz5zf8EqShjz766KOPPmr47cD48eM//PDD2Gx54YUXnnjiieFAwUEQpKSkXHjhhUuXLr3yyivrrV7v/s+lS5du3Lhx/vz5aWlp9bJl//79+/fvX+8vwOzZs+fPnx99j3DfffcdJlvu3bs3zOctW7YcPHhww2z52Wef3X///fPnz8/IyIjNlmPHjp09e3b0u9y8efP58+cPHz683upvvfVW+Lsc27h69er58+d36tTpoNly9OjRUQh/5JFHomy5f//+8HFycvLAgQNlS+B/FzWxAAAAfF+uWwL/F3Xr1i0nJyd2Kshu3brFVsA+//zz9aZD7NSpU6dOnX7/+9+PGjUqvBAaBMGRRx6Zk5PTr1+/tLS0G264IbpqumnTpkcffTQnJye2CLah1atX//a3vw3L/HJycpo2bRq2n3XWWdEsml26dInagyB46aWXwitIZ555Zps2bRYsWNC6deupU6cGQRB7Aapz5845OTnR+Lfbt29/+OGHc3JyUlNT161bt2DBgg8++CDs+s///M9whMy0tLQzzjjjwQcfTEtLCzcYPuuGo5jGevXVV8OK3Pfee2/jxo333HNPVM17UO3bt8/JyQmHtJ0zZ0442G8QBKeffno0BWIkMzMzJydnz549t956a9iyZcuWsrKyYcOGxS48d+7cRo0ahcdcU1MTLdxQXV3d2LFjTz755Hrtb775ZuvWrXNycqLLwm+++eZbb70VTfIRBEFUCfnWW2/NnDkzJycntiz2UBYtWhQeT11dXX5+fvSyhl3Lly/PyckJX6AHHnggupR30kknhVeDgyBIT0/Pzc3t1q1b+OPixYvD6UmGDBkSXvV955137r333pycnPbt25eVlS1YsGDLli11dXUjR44cOXJkWlpaWC6blpY2adKkzZs3h8fz7rvv7tixY/bs2dFVxxNOOCG8Ivfuu+9++OGHOTk5sWWx9QwaNChcIC4uLnq3BEHw2muvVVZW1rs2+4Mf/CBaZteuXQsWLGjXrl1OTk7nzp2jyTwGDhyYk5OTlZXVuHHjaOHwUAcMGHDKKacsWLBg3bp1YfuSJUuqqqrmzJmzaNGisOWjjz5q0qRJTk5ORkZG9AYIW6IH4elavHjxnj17hg0btmDBgmgmz6VLl+7Zs+fRRx891AyZ/yNqamoWLFjw3HPP1dTU/OUvf/noo48SExNzcnKOPfbYgoKCBQsWfPPNN/44A7IlwP++bFlQUBDdjtjQwoUL65XYPfTQQx06dBg9enSnTp1is+UNN9wQTthwww03RAtPnjz5vffeO/vssw+fLdeuXXvnnXcGQTB06NCRI0dGGTJMBQdd5eWXX77vvvuCIGjTpk2vXr3uuuuuW265JT8/v95iWVlZ1157bZRVLr/88jfeeGPEiBGpqanr16///e9/H03q8Oqrr7766qtBENxzzz0DBgwYPXr0dddd17CC8VBee+21u+++O/pxxowZh1++Q4cOV155ZZcuXT766KPRo0evXbs2igEHzZaXX3757Nmzf/vb38a2Dxs2LKpB/fTTT0ePHn3JJZcUFBQEQXDTTTdF9+Y1dMwxx8yfP79Hjx7Lly+PbX/rrbdKS0tPO+20KFu+9dZbTz/99Pz5848++uhosS+//DLMhNu2bTv11FO/S7Z8++2333777SAIbr755nov0+LFix977LEw6JaVlc2aNSvqKigoiLJlq1atYmdZshrieAAAFU1JREFUfOedd2677bbw/RbW8b777rtbtmwZMmRI+/btw7i4dOnSrl27zp8/P7aUtGXLlpMnT/7d7353/fXXx76ro8fXXHNNmC3DWx8HDx58mGx5wgknXH311eG3D1El9qZNm0aPHl1RUVEvWw4aNCi6PXjLli0ffvjhcccdd+2118YuM3DgwLAlKysrnKOysLDw5z//eRAEeXl5AwYMeOSRR6IkGXr00Udjf2zVqtVFF1301VdfXXbZZVEsD89AkyZNxo8fP2zYsLKystGjR2/duvXEE0987LHHoklEoy8p/qF/dmpra+fNmxeG+bBGt0mTJn379h05cmT37t2XLVsmWwL/26mJBQAAQLYEAADgX01NLPC/UlVV1Zo1axo3brx169a6urrYrqZNm7Zt27a0tHTXrl1BEJSUlKxevTrs2rp164EDB1q3bp2RkRHe6bd79+7i4uK6urpwrfj4//rGrUmTJm3btt2+fXu4nW3btsXHxx84cODwB7Z79+6SkpLKyso9e/asXbu2vLw83E5CQkK9JVu1apWUlFRSUnLgwIFw4YqKiuTk5IyMjIYLB0GwZ8+edevWJSUlhbeN1dTUbN68ef/+/aWlpeETbNWqVVidGy28e/fu5OTktm3btmrVKjMzs95mGzduHLuv2tra7du3t2/fvra2Njpj9RZOTPyv/xp79+5dv359QkJCeDxlZWV79+5t27ZttEzUEh1VEATV1dXr168/cODApk2bYgfsPYyWLVtGw8lWV1eXlJSUlZVFR7ht27aMjIy0tLSwKy4u7lBjz5aXl1dXV2/YsCG2ljUpKSkjIyMpKalDhw7h/bc1NTXFxcXl5eU1NTUbNmxITk6ODiMpKaljx46bN2/+7m/UtLS0cGKVli1b1tTUlJSU1NTUhF0HDhzo2LFjo0aN0tLSomOura0tKSkpLy8Pj7Nx48a1tbXFxcXRWmVlZfV20aJFi3bt2m3btm316tXr16+vrq4Ot7Np06bYiVsSExMzMjJatGgR7Wvfvn2xW96xY8f69eu/S6FvEAQVFRXr1q3LyMiorq7evn17eBgJCQmZmZmJiYnr1q0L7z3et2/f5s2bS0tLo0lfYpc5/L6aN28eHmpSUtK6dev27NkTBEF8fHxGRkZycvL+/ftLSkr27t0bttTU1Ozfv3/Lli2lpaXh6qmpqVlZWdHLF4qPj2/Xrl3r1q3DB127dj1w4EBxcXF0p3Rqamp4qNEBp6amhoexc+fO8FxVVlZGe4mPj6/3LOLi4tq2bbt///7wgCM7d+5cs2bN7t27YxsPHDiwdevWkpKS1NTUjIyMrl271tXVlZSUxMfHd+zYMfZGawDZEuAf5ZNPPrnwwgvj4+N37NhRL6L069dv+vTpv/nNb8L7mu6///4FCxZEn55ramp+9rOf/fSnPw2nG/n0008LCgr27NkzePDg6dOnx36YO/bYY++444677777hRdeCIJg1qxZjRo1qvd5saHly5cXFBR88cUX1dXVEydOTEhIGDhw4PTp0xuOiDNx4sROnToVFBRUVlZ+8cUXkyZNSkxMPP744++4445wqJt6VqxYMXny5HHjxj3xxBNBEDz55JMPPvhgZWXln//85/CZXnvttdHYM0VFRVOmTElKSurbt+8dd9xx8cUXV1VV1dtsjx49pk+fHt1h+NRTTy1duvT2229//fXXx4wZU2/vffr0mT59euxQNN98801eXt4FF1wQHs+99967bNmy6dOnRzd53nvvvZ999tn06dMHDhy4YcOGsPHbb7/9+c9/3rhx46qqqtjpPQ5j3Lhx0VQTRUVFBQUFTzzxRHTrXceOHW+44YZ+/fqtXbu2oKDg2GOPDY+noQceeOCJJ564+uqrr7jiigEDBoSNnTt3nj59epcuXZo0adKhQ4cgCNavX19QUPDuu++Wl5dfe+210R2zEydO/I//+I+77rrrD3/4w3vvvfcd36jnnXdebm5uEATt27ffvHlzQUHBqlWrwq7hw4ffc889WVlZ5557bjQOU7j35557rri4ePr06T169NiyZUtBQcHXX38dLrBly5Z6uxg1atQFF1wwe/bsDRs2VFdXh6m7pKSk3h3FmZmZd9xxx6hRo4477rhoUzfeeGM4V0oQBC+99FJJSclh7laN9dJLL23duvWOO+744osvwptsx44dm5eXN23atBdeeOGyyy4L50fZsWPHrbfeumHDhmuuuSYK27feeuuLL744ZcqUw+9r+PDh4QyQixYtys3NDc9b8+bNf/nLXx5//PHl5eUFBQWffPJJamrqL3/5yzVr1tx9992/+tWvopR4xhln3HTTTUceeeTnn38ebTMlJeXmm29u3Lhx+KCysrKysrKgoCCaYWXo0KHhjbvR78XQoUPDd9Tzzz9fWFgYBMGbb755++23R99k3XHHHbGHnZycfMMNN5SWlta793jRokUXX3xx9OqHampqfve7323cuPGXv/zl9ddfn5ubW11dXVBQkJqaOm3atCOPPNKfekC2BPiH27Fjx9KlSw/alZaW1r9//+iyw5o1a6LRIENHHHFEjx49wscVFRVLly6tqqpq3bp1vWuSaWlpxx9/fPQRMxp15vAqKys/+eSTioqKMAAHQdCiRYv9+/c3XLJLly7dunULr/Lt3LkzHDAzJSVl3759B91yuMyECRPCHPLII48UFRWFaSQc0rakpCRaeNeuXZ999ln4Sbe2tjYrK6vhBlNTU4877rhwENEgCObNm7dhw4ZevXq9/PLLDSczTExMrJfhq6qqli1bduGFF4bH065du2+//bZv376dO3eOwsyqVav69u2bmZkZZcuqqqp64+j8XeEIvdFhJCcnf/vttxs3bgxbamtre/To0b59+08//XT58uX9+vU71ISNCxcu3LNnz+effx574bFp06bHHHNMNIt9EASxy3zxxRdR+5lnntm0adM+ffqEEfQ76tChQ3Q8RUVFX3zxRRR1fvjDH4Zj3jRt2jTaZlpaWtOmTb/55pvly5eH17iqq6u//PLL8NU8qPbt22dnZ69duzZ8v0WhZcWKFfXeb1VVVUcffXRmZmb0lo5GEg6CYOvWrcuWLauqqvouz6u4uHjZsmW7du0qLi4O3y0nnnhio0aNjj766Ndee23ZsmXRq7Ny5crYIZfDZV5//fXPPvssrAg4lIyMjPC7jCVLlkTDySYlJfXs2XPgwIHbtm0Lv69JSkrKzs6uq6vbv3//V199Fa3etm3b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vTssJd2xY0fszbRZWVnhEb7++utRCv3kk0/Ca9d79uyJLUANN9LwsnasDRs2hKt07tw53PKiRYvCAzvllFOixZo0adKwkjNMkg1f7vCexo0bNzZq1Khbt27RtKtBEKxevTr28mzHjh379Onz7bfffvzxx2HLoEGDkpOT+/bt23Doo44dO3bs2PFQT6Rx48bHHntslIti02z4Xjr++OOjQ928eXPz5s0///zzJUuWhFdHa2trly9fvnr16ui+3NCWLVvCZbZs2RKelmOPPTbsat++/aBBg+pdh0xKSqo3i2YUzr/L78VBPg8lJvbp02fNmjXRuyUU1dC2a9euSZMmd91116pVq1JTU3v37h27o4SEhLBl586dv//97zMzMwcPHnyofSUkJPTq1St29d27d69YsSJ212GJ+6EGpgL4/5M5SAAAAJAtAQAA+FdTEwv8j+natevEiRPrzTZ5KMcdd1w4wk1WVtaECROOPPLIpKSk8EG4wGmnnVZdXV1v/JisrKxLL700tlj02GOPTUhIOOWUU3bv3h078s0pp5xS767Lbt26paamXnzxxbEjgkR69+4djiLTsWPHiy66qLq6unfv3rHDmZx00knhwURjzJ500knhU+jRo0erVq3Gjx8fFVXGjjtaz5AhQ6LRg7Kzs+uN9tG+ffsLL7xw165d9bpOPPHEI444Ijk5efDgweHxH3300YfaxeDBg+sVl/bq1St63K5du5/+9KdR+W7UNWjQoHbt2jVt2jR6cJiXb9CgQeFNg5E+ffq0bdt27NixsRMwdu3atd6YPW3atBkzZkzDasaBAwfGDnITBMGAAQPCXUS1kbFdTZs2bTgUZxAE/fv3D9fq27dvvZbwxQ1LK9PT03NycrZu3Rqt2KFDh/Du1pYtW55//vlRYWq/fv2i1du3b5+WlhbbEsnMzAxHfImkpaX95Cc/iSb8OO6448K1osrVvn37hi2HHxG0efPm5557bu/evRt2paamnnPOOf369WvTpk3szbFRV7T38PSec8450WmJRkM95phjoqeTnp4eDYwcatas2ahRo/r06RO1tGzZMnZGx969e9c7G4MGDYoeN23a9Oyzz+7Zs2eLFi3CQV+bNGkycuTI7OzscFrOXr16Ras3b968Xbt2+/btC1tia0qTk5PPOuus8Ff4oDdS9uzZM1zrxBNPbNh14YUX1hv4KtKoUaMRI0Z06dIlHK23cePG9Z5ObOVqUlLSiBEjOnfunJycHFs23KNHj4suuihsSUpK+tGPfhRV8Hbv3r3hu6VRo0bR0MehhISE4cOHN3xq0ck86qijGm6noYSEhKysrOrq6gkTJtQbHTouLu7000+Pxso68sgjJ0yYEN7TG3alp6cfZnpYgO8i7jt+CgQAAIBDURMLAACAbAkAAIBsCQAAgGwJAACAbAkAAACyJQAAALIlAAAAsiUAAACyJQAAAMiWAAAAyJYAAADIlgAAAMiWAAAAIFsCAAAgW8L/a7+OaQCAYQCGKUQKesfwDkPPSTaEfAEAALwlAAAA3hIAAAC8JQAAAN4SAAAAbwkAAIC3BAAAAG8JAACAtwQAAMBbAgAA4C0BAADAWwIAAOAtAQAA+Potz52qJAEAAGDpAfRpnZcAmN5IAAAAAElFTkSuQmCC" />
          <div class="t m0 x1 h2 y1 ff1 fs0 fc0 sc0 ls1 wsc">Form I-90 02/27/17 N</div>
          <div class="t m0 x1 h3 y47 ff2 fs1 fc0 sc0 ls1">9.</div>
          <div class="t m0 x1 h3 y48 ff2 fs1 fc0 sc0 ls1">10.</div>
          <div class="t m0 x3 h7 y49 ff2 fs5 fc0 sc0 ls1 wsc">Part 1. Information About You <span class="ff1">(continued)</span></div>
          <div class="t m0 x1 h3 y4a ff2 fs1 fc0 sc0 ls1">8.</div>
          <div class="t m0 xd h8 y4b ff1 fs1 fc0 sc0 ls1 wsc">Date of Birth <span class="_ _b"> </span>(mm/dd/yyyy)</div>
          <div class="t m0 xd h8 y4c ff1 fs1 fc0 sc0 ls1 wsc">City/Town/Village </div>
          <div class="t m4 x18 h8 y4c ff1 fs1 fc0 sc0 ls1 wsc">of<span class="_ _2"></span> <span class="_ _2"></span>Bi<span class="_ _2"></span>r<span class="_ _2"></span>th </div>



          <div class="t m0 xd h8 y4d ff1 fs1 fc0 sc0 ls1 wsc">Country of Birth </div>
          <div class="t m0 x19 ha y4e ff3 fs1 fc0 sc0 ls1">►</div>
          <div class="t m0 x1 h3 y4f ff2 fs1 fc0 sc0 ls1">14.</div>
          <div class="t m0 x1 h3 y50 ff2 fs1 fc0 sc0 ls1">13.</div>
          <div class="t m0 xd h8 y51 ff1 fs1 fc0 sc0 ls1 wsc">Class of Admission</div>
          <div class="t m0 xd h8 y52 ff1 fs1 fc0 sc0 ls1 wsc">Date of Admission </div>
          <div class="t m0 x1a h8 y29 ff1 fs1 fc0 sc0 ls1">(mm/dd/yyyy)</div>
          <div class="t m0 xd h8 y53 ff1 fs1 fc0 sc0 ls1 wsc">U.S. Social Security Number (if any)</div>
          <div class="t m0 x1 h3 y54 ff2 fs1 fc0 sc0 ls1">15.</div>
          <div class="t m0 x10 h3 y55 ff2 fs1 fc0 sc0 ls1 wsd">2.e.<span class="_"> </span><span class="ff1 wsc v0">My name or other biographic information has been </span></div>
          <div class="t m0 x1b h8 y56 ff1 fs1 fc0 sc0 ls1 wsc">legally changed since issuance of my existing card.</div>
          <div class="t m0 x10 h3 y57 ff2 fs1 fc0 sc0 ls1 wse">2.f.<span class="_"> </span><span class="ff1 wsc v2">My existing card has already expired or will expire </span></div>
          <div class="t m0 x1b h8 y58 ff1 fs1 fc0 sc0 ls1 wsc">within six months. </div>
          <div class="t m0 x10 h3 y59 ff2 fs1 fc0 sc0 ls1 wsf">2.g.1.<span class="_"> </span><span class="ff1 wsc v2">I have reached my 14th birthday and am registering </span></div>
          <div class="t m0 x1b h8 y5a ff1 fs1 fc0 sc0 ls1 wsc">as required. My existing card will expire AFTER my </div>
          <div class="t m0 x1b h3 y5b ff1 fs1 fc0 sc0 ls1 wsc">16th birthday. (See <span class="ff2">NOTE</span> below for additional </div>
          <div class="t m0 x1b h8 y5c ff1 fs1 fc0 sc0 ls1">information.)</div>
          <div class="t m0 x1b h8 y5d ff1 fs1 fc0 sc0 ls1 wsc">I have reached my 14th birthday and am registering </div>
          <div class="t m0 x1b h8 y5e ff1 fs1 fc0 sc0 ls1 wsc">as required. My existing card will expire BEFORE </div>
          <div class="t m0 x1b h3 y5f ff1 fs1 fc0 sc0 ls1 wsc">my 16th birthday. (See <span class="ff2">NOTE</span> below for additional </div>
          <div class="t m0 x1b h8 y60 ff1 fs1 fc0 sc0 ls1">information.)</div>
          <div class="t m0 x10 h3 y61 ff2 fs1 fc0 sc0 ls1">2.g.2.</div>
          <div class="t m0 x10 hc y62 ff2 fs1 fc0 sc0 ls1 ws10">2.d.<span class="_"> </span><span class="ff1 wsc v3">My existing card has incorrect data because of </span></div>
          <div class="t m0 x1b h8 y63 ff1 fs1 fc0 sc0 ls1 wsc">Department of Homeland Security (DHS) error. </div>
          <div class="t m0 x1b h8 y64 ff1 fs1 fc0 sc0 ls1 wsc">(Attach your existing card with incorrect data along </div>
          <div class="t m0 x1b h8 y65 ff1 fs1 fc0 sc0 ls1 wsc">with this application.) </div>
          <div class="t m0 x1 h3 y66 ff2 fs1 fc0 sc0 ls1 wsc">Mother&apos;s Name</div>
          <div class="t m0 x1 h3 y67 ff2 fs1 fc0 sc0 ls1 wsc">Father&apos;s Name</div>
          <div class="t m0 x1 h3 y68 ff2 fs1 fc0 sc0 ls1 wsc">11. </div>
          <div class="t m0 xd h8 y69 ff1 fs1 fc0 sc0 ls1 wsc">Given Name </div>
          <div class="t m0 xd h8 y6a ff1 fs1 fc0 sc0 ls1 wsc">(First Name) </div>
          <div class="t m0 x1 h3 y6b ff2 fs1 fc0 sc0 ls1 wsc">12. </div>
          <div class="t m0 xd h8 y6c ff1 fs1 fc0 sc0 ls1 wsc">Given Name </div>
          <div class="t m0 xd h8 y6d ff1 fs1 fc0 sc0 ls1 wsc">(First Name) </div>
          <div class="t m0 x10 h9 y49 ff4 fs5 fc0 sc0 ls1 wsc"> Reason for Application (<span class="ff5 ws11">Select</span> only one <span class="ff5">box</span>)</div>
          <div class="t m0 x10 h3 y6e ff2 fs1 fc0 sc0 ls1 wsc">Section A. <span class="ff1"> (To be used </span>only<span class="ff1"> by a lawful permanent resident or </span></div>
          <div class="t m0 x10 h8 y6f ff1 fs1 fc0 sc0 ls1 wsc">a permanent resident in commuter status.)</div>
          <div class="t m0 x10 h3 y70 ff2 fs1 fc0 sc0 ls1 ws12">2.a.<span class="_"> </span><span class="ff1 wsc v0">My previous card has been lost, stolen, or destroyed.</span></div>
          <div class="t m0 x10 h3 y71 ff2 fs1 fc0 sc0 ls1 wsa">2.b.<span class="_"> </span><span class="ff1 wsc v0">My previous card was issued but never received. </span></div>
          <div class="t m0 x10 h3 y72 ff2 fs1 fc0 sc0 ls1 ws1">2.c.<span class="_"> </span><span class="ff1 wsc v0">My existing card has been mutilated. </span></div>
          <div class="t m0 x1 h9 y73 ff4 fs5 fc0 sc0 ls1 wsc"> Additional Information</div>
          <div class="t m0 x1 h3 y53 ff2 fs1 fc0 sc0 ls1">16.</div>
          <div class="t m0 xd h8 y74 ff1 fs1 fc0 sc0 ls1 ws13" style="left: -40px; top: 65px;">
            Gender<span class="_"></span><span class="ws14 v0" style="left: 120px;">Male<span class="_"> </span>Female</span>
          </div>
          <div class="t m0 x1c h7 y75 ff2 fs5 fc0 sc0 ls1 wsc">Part 2. Application Type</div>
          <div class="t m0 x1b h3 y76 ff2 fs1 fc0 sc0 ls1">NOTE<span class="ff1 wsc">:  If you are filing this application before your </span></div>
          <div class="t m0 x1b h8 y77 ff1 fs1 fc0 sc0 ls1 wsc">14th birthday, or more than 30 days after your 14th </div>
          <div class="t m0 x1b h3 y78 ff1 fs1 fc0 sc0 ls1 wsc">birthday, you must select reason <span class="ff2">2.j.  </span>However, if </div>
          <div class="t m0 x1b h3 y79 ff1 fs1 fc0 sc0 ls1 wsc">your card has expired, you must select reason <span class="ff2">2.f.</span></div>
          <div class="t m0 x15 h2 y1 ff1 fs0 fc0 sc0 ls1 wsc">Page 2 of 7</div>
          <div class="t m0 x1 h3 y7a ff2 fs1 fc0 sc0 ls1 wsc">NOTE: <span class="ff1"> If your conditional permanent resident status (for </span></div>
          <div class="t m0 x1 h8 y7b ff1 fs1 fc0 sc0 ls1 wsc">example: CR1, CR2, CF1, CF2) is expiring within the next 90 </div>
          <div class="t m0 x1 h3 y7c ff1 fs1 fc0 sc0 ls1 wsc">days, then do <span class="ff2">not</span> file this application. (See the <span class="ff2">What is the </span></div>
          <div class="t m0 x1 h3 y7d ff2 fs1 fc0 sc0 ls1 wsc">Purpose of This Application<span class="ff1"> section of the Form I-90 </span></div>
          <div class="t m0 x1 h8 y7e ff1 fs1 fc0 sc0 ls1 wsc">Instructions for further information.)</div>
          <div class="t m0 x1 h3 y7f ff2 fs1 fc0 sc0 ls1 wsc">My status is<span class="ff1"> (Select </span>only one<span class="ff1"> box):</span></div>
          <div class="t m0 x1 h3 y80 ff2 fs1 fc0 sc0 ls1 ws16" style=" left: -65px; bottom: 226px;">
            1.a.<span class="_"> </span><span class="ff1 wsc v0">Lawful Permanent Resident<span class="ff2"> </span>(Proceed to<span class="ff2"> Section A.</span>)</span>
          </div>
          <div class="t m0 x1 h3 y81 ff2 fs1 fc0 sc0 ls1 ws16">1.b.<span class="_"> </span><span class="ff1 wsc v1">Permanent Resident - In Commuter Status </span></div>
          <div class="t m0 xe h3 y82 ff1 fs1 fc0 sc0 ls1 wsc">(Proceed to <span class="ff2">Section A.</span>)</div>
          <div class="t m0 x1 h3 y83 ff2 fs1 fc0 sc0 ls1 ws17">1.c.<span class="_"> </span><span class="ff1 wsc v1">Conditional Permanent Resident </span></div>
          <div class="t m0 xe h3 y84 ff1 fs1 fc0 sc0 ls1 wsc">(Proceed to <span class="ff2">Section B.</span>)</div>
          <div class="t m0 x10 h3 y85 ff2 fs1 fc0 sc0 ls1 ws18">2.j.<span class="_"> </span><span class="ff1 wsc v4">I have a prior edition of the Alien Registration Card, </span></div>
          <div class="t m0 x1b h8 y86 ff1 fs1 fc0 sc0 ls1 wsc">or I am applying to replace my current Permanent </div>
          <div class="t m0 x1b h8 y87 ff1 fs1 fc0 sc0 ls1 wsc">Resident Card for a reason that is not specified above.</div>
          <div class="t m0 x10 h3 y88 ff2 fs1 fc0 sc0 ls1 wsc">2.h.1.a. </div>
          <div class="t m0 x10 h3 y89 ff2 fs1 fc0 sc0 ls1 ws19">2.h.2.<span class="_"> </span><span class="ff1 wsc v4">I am a commuter who is taking up actual residence in </span></div>
          <div class="t m0 x1b h8 y8a ff1 fs1 fc0 sc0 ls1 wsc">the United States. </div>
          <div class="t m0 x10 h3 y8b ff2 fs1 fc0 sc0 ls1 ws1a">2.i.<span class="_"> </span><span class="ff1 wsc v4">I have been automatically converted to lawful </span></div>
          <div class="t m0 x1b h8 y8c ff1 fs1 fc0 sc0 ls1 wsc">permanent resident status.</div>
          <div class="t m4 x1b h3 y8d ff2 fs1 fc0 sc0 ls1 wsc">My<span class="_ _2"></span> P<span class="_ _2"></span>or<span class="_ _2"></span>t-<span class="_ _2"></span>of<span class="_ _2"></span>-E<span class="_ _2"></span>nt<span class="_ _2"></span>ry<span class="_ _2"></span> (<span class="_ _2"></span>PO<span class="_ _2"></span>E)<span class="_ _2"></span> i<span class="_ _2"></span>nt<span class="_ _2"></span>o <span class="_ _2"></span>th<span class="_ _2"></span>e <span class="_ _2"></span>Un<span class="_ _2"></span>it<span class="_ _2"></span>ed<span class="_ _2"></span> S<span class="_ _2"></span>ta<span class="_ _2"></span>te<span class="_ _2"></span>s <span class="_ _2"></span>wi<span class="_ _2"></span>ll<span class="_ _2"></span> b<span class="_ _2"></span>e:</div>
          <div class="t m0 x10 h3 y8e ff2 fs1 fc0 sc0 ls1 ws1b">2.h.1.<span class="_"> </span><span class="ff1 wsc v2">I am a permanent resident who is taking up commuter </span></div>
          <div class="t m0 x1b h8 y8f ff1 fs1 fc0 sc0 ls1 wsc">status. </div>
          <div class="t m0 x1b h8 y90 ff1 fs1 fc0 sc0 ls1 wsc">City or Town and State</div>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 39px; left: 104px;">  @AdditionalInformation.Male </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 39px; left: 152px;">  @AdditionalInformation.Female </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 63px; left: 192px;">  @AdditionalInformation.DOB </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 99px; left: 58px;">  @AdditionalInformation.CTVOfBirth </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 135px; left: 58px;">  @AdditionalInformation.CountryOfBirth </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 183px; left: 118px;">  @MotherInformation.FirstName </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 237px; left: 118px;">  @FatherInformation.FirstName </p>
          <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 357px; left: 169px; letter-spacing: 38px;">@OtherInformation.SSN </p>

        </div>
        <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
      </div>
      <div id="pf3" class="pf w0 h0" data-page-no="3">
        <div class="pc pc3 w0 h0">
          <img class="bi x0 y0 w1 h1" alt="" src="data:image/png;base64,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Sw8dOtS4w759+5aUlDRr1uzjjz8uLS394Q9/mJGRUVpaeumllw4ZMiQIgocffvi999476s5Mnjx52LBh4fKnn346ffr0/fv3hy8vv/zy4cOHB0Hw6KOPVldXl5SUzJgxY9GiReHa3r17FxcXP//88wsXLkzos2fPniUlJenp6QnlTzzxxIIFC4IguPTSS88444yEtZ9//nlpaenevXtPOOGEkpKSzMzM+FXTp0/fs2dP+PKSSy4ZOXJkEARPPfXUW2+9FQTBxRdfPGrUqCAInn766Y0bNxYXF2dnZ69atWr69Om1tbXHHXdcSUlJdnZ22PyZZ55544034jd90UUXFRUVBUHw7LPPzps3Lyzs1q1bSUlJq1atEvZzxowZ5eXlxcXF8+bNe/311+NXTZgw4R/+4R+CIHjuuedee+21hIbHHntscXFxmzZtvvrqq+nTp+/cuTMsHz9+/JgxY+Jrzpw585VXXglX9ezZc/r06RUVFQUFBSUlJYsWLQpXRS644ILvfve7QRC88MILc+bMOeq7fP7555977rnh8saNG6dPn75t27bG1Tp27FhSUtK+ffvNmzeXlpZu3bo1WtWhQ4fi4uIPP/xw6dKlxcXFHTt2DMtnzZo1a9ascLl9+/bFxcWdOnXaunVraWnpySeffP755x91f/7lX/7lxRdfDILgu9/97pAhQ0pLSzdu3Bitzc/PLykpKSgoCF/OmTPnhRdeCIJgzJgx48ePDwt37Ngxffr09evXR63atGlTUlLy5z//ecGCBSUlJV26dIlW7dy5s7S09IQTTpgwYUL8bsydO/f555+PLznrrLMmTpwYLu/atau0tLR79+5FRUXTp08vLy9v1apVSUlJt27dqqqqSktLy8vLE46rqKjorLPOmj59+po1axofdXZ2dnFx8fHHHx++fOONN5555pkgCEaNGnXxxRcHQfDmm28+/fTT4dqsrKySkpLCwsKETt56662nnnoqXM7MzCwuLu7Ro8eePXtKS0vbtWt36aWXxld+++23n3zyyXA5PT29pKRkx44d8SXFxcW9evWqq6srLS1t06bNZZddFq6qq6ubPn16bm5uVPJ1Fi1a9Nhjj4XLzZs3Ly4urq2tffrpp0tKSmprax999NEgCIYOHXrFFVcctfl777338MMPh8tNmzYtKSnp169fQp1//dd/feihh/7tb3UpKcXFxQ0NDY888khxcXH//v2jVYcPH54+fXpKSsrVV18dBMH777//0EMPFRcXDxgw4MiRI6WlpR999FFSUlJxcfEpp5zizxnwV4oB/AcpKytLSkr6C3/5jB079uDBg7FY7KWXXkpJSXn22WfDhWeeeSbsbdKkSeeee25DQ0P8JmbPnt2sWbOjdjhmzJh9+/bFYrE5c+Y0b978ySeffPnll1u0aPHkk0+GbX/wgx983c48/vjj0Sbmzp2bkZERrXr00UfD8ssuu6yoqKi2tvbyyy+P1n7nO9+pqamZPHly4z5HjhxZVVXV+CxdeeWVYYUHHnig8dr58+e3bt06CIIRI0bs3LkzftXbb7+dm5sb9V9aWhqWFxcXhyX3339/WFJSUjJ06NBt27bFYrFFixbl5+cHQTBkyJCtW7dGvU2ZMiVhh+++++5w1TXXXBMVnnbaaZs2bWq8n9ddd93AgQM3btx4/fXXJ/Rz1113hXV+8pOfND4tAwYMWLduXSwWW7p0aefOnaPy22+/PWETP//5z8NVt91220cffXTssccGQdCvX781a9bccMMNCd3eeuutYaupU6d+3bt8yy23RJ1/+umnUbxJ0KtXr88//zwWi61cufKEE06IX9WjR4/PPvvsxhtvDBei3m666aaoTmFh4YoVK2Kx2Oeff96rV69f/epXX/fzcsstt4RNfvnLX65evfrEE0+M31a3bt2WL18eVb711lvD8htuuCEqLC8vP+mkk+JbdenS5cMPP7z99tvDhfjNffXVV/379//Zz36WsBt33nlnwhn4yU9+Eq3dsGHDqaeeev3112/cuHHgwIFh9l68eHEsFtu0adNpp53W+ARec801mzdvDv9D1Fjbtm3feeedqP977703LC8pKQlL7rvvvqhyXl7ewoULG5+60tLSqE5ubu7bb78di8V27tw5YsSIH/3oRwmVH3jggahyTk7Om2+++eCDD8Zn3TfeeCMWi1VVVY0cOfKKK66IGlZXV48aNWry5Mn/5q++MD2GMjIy5s6d+9hjj6Wnp7/66quPP/54WH7ppZd+XfMo6IbRdM6cOY3rRFn6mzVt2nTWrFnPPPNMSkrKSy+9FN/DwYMHx44dO2HChPDljBkzmjRp8sILL8RisUOHDp133nlBECQlJZWVlflbBvzVjIkFAADg25ItAQAA+Lbcbwn8ndi5c+eCBQuaNWu2ZcuWYcOGVVVV1dfXhwvh7Yhbt25t3bp17969V69enXCj3eeff/7JJ5/06tUr/t7OVq1a9e7du6amJmq+a9euhQsXZmVlnXnmmWGdvn37JicnH3V/qqqqFi1alJGREfZTXl5eX1/fu3fvqMKqVavCnqNtNW3aNCcnZ9iwYbt37z7mmGPef//9Fi1aRPU3bNgwcODAjz/+eMuWLUEQrF69OmyelpYW7k9dXd2yZct69eoVBEF1dfW7776bk5OzcuXKhoaG4447rmvXrkuWLMnIyMjOzu7du/dxxx0XHUWovr4+7HDjxo0tW7bs3bt3ampqjx49UlNTv/zyy+hWwHBVEAS1tbXvvffehg0bEg58zZo1YT/NmjXr37//ypUrO3XqFN032LZt22XLlgVBkJmZOWjQoK5du+7evXvlypXl5eVhq27dusWPlQ2CoLy8vGXLlvX19fGFGRkZvXv3TktL27NnT9h8yZIlvXv37tq1a8JxrV27Nrwjce3atR988EHv3r0b3wT7Dbp06RIOx/3qq6+ikoEDB4ad7N27NxwcG220U6dO8f2vW7cuepej5l27dg2CoHPnzgMHDvzss8/CN/GUU06JxjyvW7cuqr9v376VK1ceOnQo3ETY9psVFBQMGjQovFm3vr5+5cqVOTk5GRkZAwYM6NatW/w7vnLlyuiuyGOOOaZ79+7hG/fee+/17t27ZcuWUeXU1NT+/funp6fn5ua2bNlyw4YN77//fk1NTadOnY477riwTkNDw8qVKzdu3Pjuu+/W1NTE71KzZs169+6dnZ2dk5OTnZ29adOm9evXh5/VBB07doxOZnZ2dlh53bp1vXv3zsnJieoMHTp05cqVNTU1Bw4cWLZs2eHDh3fv3l1VVRX1s3nz5rVr14af1ZSUlN69e7dq1So1NXX9+vVffPFFQslbb721d+/eqqqqZs2aRe9XQ0PDMcccE93tuWXLljVr1vTu3Tsctf51Dh069Mknn+zatavxqsOHD69cubJp06Y9e/aML6mqqooOuVmzZvFD3wH+xhgWDPx93G/ZtGnT1q1b5+bmXnDBBZs2bbr88svPP//8jRs3Xn755bm5ubm5uampqSNHjly/fv2FF16Y0DYjI+PCCy/cs2dP/P2WZ5xxxldffXXllVdGzcNN/OEPf6j4v2pqag4fPnzU+y2bNm3aqlWr3Nzc8847r7q6+vrrrx87dmxVVVV0v2X4NT30ve99b9euXbFYrKGhobKysqKi4uWXX+7WrVtunLPOOmv16tU//OEPE5rffffd4c5MmTLlnHPO2bFjRzgBUrj1li1bJiUl3Xrrra+99lphYWFubu7ZZ5+9bdu2PXv2VPz/XXfddWGHzZs3HzBgwIoVKyoqKqqrqw8dOvTLX/4y2o2ioqLNmzdfd911KSkpOTk5zZs3TzjwtLS0sOYdd9zx+uuvd+jQ4cYbb4y2Mn/+/D59+tx3330HDhzYtWtXRUXFG2+80alTp6jVvffem3C/ZVpaWnZ2dpMmTYK4+y179+69ZMmSsMMuXbqkpaWdfvrp5eXle/fubXxcUT/Dhg1bs2bNv+t+y5/97GdhPz/96U/D2yzDEBJ+eletWjV48OBf//rX0eaiVeH9li1atMj9/5s2bVp4gHV1dYsXL+7Ro8cvf/nLQ4cOVVVVRZ384he/iO63LC8vP/3003/xi1+Eq/bu3ftv3m9ZV1e3a9euAwcOxGKx9evXjxw58sYbbww3Ed98w4YNI0eOTEtLC9v++Mc/Djdxxx139OnTJ7xdM7rf8tChQ9XV1RUVFWHP06dPz8nJSUlJueqqq6LdXrFixYABA5o3bx6uit+x/Pz8l19+uaKiorKy8sCBAw899FCPHj0WL17c+H7Lffv2RR2GlR955JHjjz/+vffei/Z83759X3zxRXhLZ1JSUlZWVm5ubqtWrZo2bRrdb/n4449369Zt0aJFDzzwQHZ29osvvlhRUbFmzZoxY8akp6e3bNnyhRdeqKioKC8vP+ecc6Lmqamp0TvVuXPnWbNm7d69O7rjsUuXLvPnz//m+y2DIMjKysrIyGh8v+XevXsnTJhQXFwcNayrq5s4ceLll18eHfLOnTv379/vfkvgb5TrlsDfiYMHD4bXCvbv39+6deuDBw9GC5WVlfHXBBrHob179+7evTuhMKx86NChqHkQBLt27WratGmbNm3+kv0Jr6KE303DTcTiJtGtq6urq6sLl6NVzZo1C6+KpKWlVVdXx1/9qK+vz8nJia5kRs1TUlLC/Tl8+HBtbW3YTxgk4sNzenp6TU1NZWVlWCcjIyN+yqIgCI4cORIdaRiMo8Osq6uLVtXW1h45ciTcRHV1deMD37dv3759+4IgaNKkSXZ2dnJycnp6etRVRkZGbW1tfX19uInw2lRycnLUKuH6ZHyH8cLw3KZNm5ycnLB5TU3NkSNH0tPTEy5LRtkprHP48OF/1+cq2vmo2/hNHD58OLxA93Ufifr6+oQjio4lLS2tVatWYQZLTk6OLsrFbyt8X755E42lpaVFRx0237dvX8ImwlW1tbXx+xNuokmTJuH/FOIrJycnR5MMhz9l4bvfokWLaMcOHDjQtGnT/fv3R9MsR8IPQ1Rz//79VVVVR53wuUWLFvGX66PKBw8ejK/TunXr8N9MsVis8Q9vQqsmTZq0bNmyTZs2ycnJ9fX1dXV1OTk5YUlKSkp9fX38z3hDQ0P0I5yWlhbN1dzQ0LBr16743fg64f4c9fL47t27U1NTE0r+wl8pAP/zyZbA357jjjsuOTl51apVsVisVatWhYWF5eXlhw4dKiwsbNKkSY8ePZo0aXLcccfV1taGC+EzSL788suqqqrFixfv2LEj6ionJ6ewsDA5Oblnz57hlbFQ9+7de/bsmZyc3L1797D5mjVr4huGJQ0NDYWFhd26dQvrxK+KKldXV7///vvp6ekJY267du3aokWLVatWFRQUJKwqLy9fuXJl/LfYrl27durUadmyZfGPxAitXbv23XffDYKg8ar4OsnJyQcOHAjD4ZIlSwYMGJCRkbFq1aqOHTt26NAhCIJjjz02Oopjjjnmk08+iUaBpqam9unTZ9WqVWEPoczMzMLCwuiL8rp163bv3l1YWLh169Zw1O66desyMzMbx4xwVbjPQRCsWrXqqHUiBQUFOTk5YbW9e/d+9NFHmzZtChe2bdu2Zs2a+vr6goKCfv36xf/XYP369VVVVYWFhQUFBeFxNR6+GwaqwsLCtLS0urq6VatWhcFj2bJlUTbbsGFDtKsnnXRSWB5W3rdv3/r16+vq6sJRoPEdNs4V0cDgpKSkqPLGjRsTmrdo0SLhkRvNmzfv169fNKg4HE0adhhfp7CwMCMjIycnJzwh0arwGnX0cvPmzeGA244dO37dKIMOHToMGDAg/vk3mzdvXrp0aWFhYVZWVkNDwxdffBF9NhL+HdOnT5/4n6MDBw588cUXmZmZJ554Yjg/cPSBbNz8wIEDq1atqq2tjUqaNm16wgkntGvX7tRTT40foLt169YVK1Z06tRpyJAhBw8eDFulpKQUFhZGY4bbtm07cODAsNXBgwdXrlzZrFmzffv2dezYsVu3btu3b1+5cmVqauqePXvCkJycnHzCCSfE5+fmzZtv3rx5zZo14VDh8P8pn3322bHHHhuVxIfnE044IScn5/Dhw6tWrQoHvm7dujX+SMPfTgcOHIje7ihjRyVNmjQpLCz85mG3AP9zuXQL/M2Nib3nnnsef/zx8KrFyJEj165de/75548cObK8vHzz5s2VlZVHjhypqqqqrKw8fPhwVVXV5s2bN2/ePG7cuNTU1Hbt2sVfFRkxYsTq1as3b968c+fOw4cPR2Nif/vb34YlUfNoJO0jjzwS7sxPfvKTiRMn1tbWRnUikyZNijYRbvS+++4LO4zGxN52223PP/98dnb2bbfdFm09Gg7aunXr+JN56623zp49u0ePHo1DS8uWLdu3b9++ffv09PRhw4Zt3769pKSkcZ3c3NzwS3+zZs3atm37yCOPLFmypF+/ftHhVFdXR/v/6quvnnjiie3/rzvvvHP27Nlt27YNgiB89Mh111130kknLV26NGpy5ZVX9uvXb8mSJdEBZmVlhVeK7rzzzujQlixZUlBQkJWVFXUe1ol2NXoYSTQm9oYbbpg7d+4xxxwTho38/PyMjIxwIWr+85//fMeOHeEnKnTbbbeFH4na2tpwD6dMmRIm5PgxsYWFhQsXLty8efObb74ZxpKUlJS8vLzf/e534ZjYzMzMcD9vvPHG7du3hwNNV61adfrpp7dv3z4vLy8lJSWq0759+2HDhoVDasMxsdFxTZkyJdyN3/zmN1HlsHlGRkZUMnjw4M8+++yf//mfozGxBw8e3LFjR01NTXhc9913X1hz2rRp0ZjYY445Zu7cuZs3b16yZMkZZ5zRPk5+fn7Tpk2jR49Mnz49LL/55pvXrVs3YMCAaA+jR4/s3r1727Zt4Y9eOCY2PT395JNPDkfJbtmyZcyYMVlZWWGra6+9Njrnhw4dqqioiP9B+Oijj/r373/ZZZd9/PHHZ511VrRXLVu2DB9GEj8mdseOHWPHjo3f+T59+ixevHjPnj1bt26NHyn6xBNP9OjRY/bs2Zs3b/7000/DR6Hk5OT86U9/qq6uDuuErerr6x944IGkpKTWrVu3b9++sLDwpZdeuv3226OSdu3ahf8fycrKmjFjRvzOf/HFF2PHjv3pT38advjII4+EreKf0RKNiU1LS3vqqac2b94cfjbGjx//5ZdfXnDBBVFYvfTSSw8fPrxz584HH3wwOsBw6y1atIhKunTpEj4TxZhYwJhYgP8KrVq1Cm8jDK/ztG/fPi0traGhoX379lFujIb/5eTkhMthnYRZfJo3b96+ffuE0aFhq3BGjah541BXU1MT3iQZ1YnEVw432niKjuzs7DDvhQvxq2praxPmAsnOzs7KyqqoqIiG0cZXjr/Uc1TxFQ4cOLB9+/a6urpoIdpE9D14/fr1O3fujC6EhsNuE2YtCjNqeM0zCIKMjIywJLreddSRitGqb1jbOBiHGSy8ABVdEI6/jJyVlZWXlxffas+ePWFiz8rKCoNQ/IW4+O/i+fn5HTp0qKqqatq0aXhtqqKiIrrWt2fPnmg5fFJoVCc6P/F1srKyjjrUMysrKzxXSUlJCVeY9+7du3fv3uiTkzDqMsy68ZXD5vEnMKzToUOHhoaG2trab7iCfdTmCTIzMxPOVV1dXRjdgyA4fPhwZWXlUZsnJycnjO1MSkpKTU3NyMjIy8vbvXt3/I4lDHwN/u+o7Pg6hw4dOnDgQOPx23V1dRUVFeEpbdasWRgOmzRpkpubG32G41vFYrHwB6q+vj4zMzM7Ozsqib+omJubG32ewx/wvXv3xk9KFLZKmKYoofmePXuaN2+enp7erl27urq6+MphndTU1MZvUHSpuXnz5t98GR/gfzLPIAEAAEC2BAAA4L+bMbHA356ZM2f27dv317/+dVJS0sGDB3/zm9907do1KSnp5ptvblz5ggsuOPnkk8OFWCz23HPPxY85XL169U033dS0adPjjz9+4sSJ0cw0L774YlJS0qRJkxImdYx33nnnRbM+rlmzZsaMGdFgtg4dOkybNi1cXrNmzXPPPTdr1qyUlJSJEydGzWfPnt2qVatwls7y8vLnnnsumrFzyZIlxx577MSJE6Oxtdu3b9+6deu111778ssvL1myJAiCc845J7zNLF6nTp0aj+8NFRQUTJo0KTMzc/369TNmzAhLfvGLX1RWVv7iF78IgmDMmDGDBw8OguCVV17505/+FD/o8dVXX921a9ePf/zjJk2ahDfLHXUTmzZtuuOOOz766KPw5VlnndW5c+cZM2a89tpr0aS1ycnJV1xxxbx587766quJEyeGU8XGGzZs2L/5AfjOd75z+umnx5fs37///vvvnzhx4rJlyxYuXBgEQWpq6j/+4z/GDzYeNWpUly5dEoYfb9++/fe///2FF14YjTvNz8+fOHHiGWeckZ+ff+2110YjJxsaGsITdeaZZ7Zr1y5hl9q0aTNp0qT8/PzWrVtHQ2eDIBgxYsSoUaOCIAgfmJEgNzd34sSJ7dq1q6ysnDFjxvbt2ysrK++///7y8vJdu3bdf//9YYeTJk1avXr1G2+8EQTB+++/37ifqqqq0tLStm3b1tTUhM93HT16dLTqueeeixZee+21rzur7777bniAQRBkZ2dPnDgxvMc1CIIhQ4aMHj361VdfnTNnzp49ezZu3Dh48OCzzz47/rREBg8ePHTo0Oeee27Dhg179+5dv379ySefnJmZedVVV4VNQunp6Z07d/7444+jkoyMjCuvvPKss84KX77//vvz589/+OGHa2trzzjjjBkzZkSP/Vy+fHl8P5MnT87KynrjjTceffTR3bt3f+9730s4tBYtWkycOLFbt27Nmzfv2rVr69at/8//+T/PPfdcNNHOgAEDzj333EWLFr399ttRyRlnnBHfSf/+/cMf6hNPPLHx2WtoaHjyySffeeedAwcOfPnll1u2bLn11lsHDhyYlpb24osvJlRu2rTpxIkTo0mbli9f/sILL4TLBw8efOqppxYvXpySkjJp0qQTTjjBL3xAtgT4T/TKK68kJSXNnDmzefPmc+bMGT9+/MMPP5yTkzN+/PjGtyoVFhaG2XLMmDFJSUkvvPBCfLb86quvfve734VB6IILLoiS5Ny5c48cORJf0tg//MM/RMvr1q27++67o9saH3rooWhKmzfffHPWrFnz5s07dOjQ2LFjoybz5s2Lljds2HDPPffEPzVkxIgR1157bRSErr766i+++GLmzJlbt24Ns2VRUVFxcfFfftI6der0j//4j+3atXv33XfnzJkTlVxzzTX33XdfmKnCbPnWW28988wz8W3nz5+/b9++mTNnduzY8Rs2sXXr1j/84Q/RyzPOOGPo0KGvvvrqggULFixYEH1lnzlzZvgYkquvvrpLly5/xQcgfN5jfMnUqVMff/zx0aNHv/POO7fffnsQBP/8z/98+eWXx9cZPnz48OHDE7rauXPnI4880rFjx+itadOmzZVXXhl+p4/exCAIbrrpprDn1NTUcePGNU6JkydPjp+8J0plCbsar1WrVpdffvmJJ5745Zdfzp8/f/v27dXV1dETEZ944okgCLp163bmmWe+//774daPqqam5sknn4xeXnLJJdFG161bF4bt2traJ598Mkr+jS1dunTp0qXRp2X48OFRtjzllFMuueSS8ePHf/DBB2HJhRdeGG7i7rvvvv766+P7ueaaa/r16/f0008vXrw4KszMzLz44ou/+W3NyMj4/ve/H70sLS19+eWXZ8yYkZOTM3DgwBkzZixatCj+hIcLaWlpF110UW1t7Zw5c5577rmWLVseNVtOmjTpzDPPjP9Xy/vvvx9ly759+1599dXjx49/6623wpLJkycnZMu+ffv27dv363b+4MGDM2fOjC/56quvZs6c2alTp6Nmy/Hj96bC0gAAF1hJREFUx0dJ+49//GOULQ8fPhwuN2/e/JRTTpEtgb8txsQCAADwbbluCfxv1L1793HjxoXzgkYl4UNNImvWrJk2bVp03bJTp0433nhjEASbNm266aabgiA455xzwiuiQRB07dr1hhtuiK6annzyyWvXri0rKwsfnHDNNde88sorf8mOde7cedy4cQsWLFi3bt2dd94ZPWXxww8/3Llz55133tmmTZtwNyoqKsLdiFdQUJBwSe2YY44ZN25cOFD2wQcfTEpK2rBhQzip6YYNG8rKyqIrUa+//no4p2V2dna4ifBgy8rKBg0aNG7cuOixE9Gq3//+99H42Ogi1ahRo8Lxn4MGDerQocO11177wgsvxF/CCuukpaU9+eSTSUlJ7du3HzduXE5OzpYtW8rKyvr375/wsNC33nrrq6++Ci/qtm3bdty4cfv374+OPSw588wzmzVr9swzz7zzzjvfcHq3b99eVlbWp0+faF7fvLy8cePGDR8+PC8vr7i4uLKyMi8vLzc3d8GCBZ9//vm4ceOisbKnn376zp07y8rKFi5cWFFRUVFREXU7fPjwqGZYp7CwMGHc7KJFi1asWJHw7lRWVj7wwANt27bdtWvX9u3bo/KhQ4f27du3rKxs+/btu3btevDBB8vLy3NycsaNGxd1G52lwYMHjxw5Mr7bwYMHV1VVlZWVbdu2rbq6OnzcaGjQoEHhGN0gCO655574Vd9g8eLFR44c2bRpU3xhbW1tWVnZ66+/Hr4cOHDgoEGDwk/Uww8/PGrUqGhDQRD89re/HTduXPSUzsaWLFmS8HleunRpenr6uHHjcnNz77rrrvCpnqEBAwZccMEF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5WVlZeE9tJEtW7Y0Dn6Rjh07Tps27dhjjw1fzp07NzyHQRDk5+dPmTKlf//+4YRJL730UvjMmK1btyY8enTs2LE/+tGPEnreuHHj1KlTZ8+e/d57723YsKHxpmfPnh3eZ/uDH/wgfIjlnDlzduzYMW3atKM+r6JNmza33nrrli1bpkyZsnbt2p07d37yySfh/1kSap599tnjx4+fOnVq3759f/azn3Xr1i1+1YQJE6ZOnfrZZ5+1bt365ptv3rlz59VXX11eXn7OOedcd9114YG3atXq5ptv3rt3b01NzeOPPx6ft2tqam666aboDIwfPz7+ptwgCIqKihJKysrK7rnnnptvvvnss89+/vnn41fl5eXt3r37lltuWbZsWUZGxmWXXda9e/ff//73t9xyS+OnEH2ztLS0qVOnnnrqqbt37546derbb78dvZUtWrQIew4/8AsWLFi7dm14Q2+LFi1uuOGG0047LTk5uWvXrvF3+TZv3vyGG26orKxMuBt50aJFl156acL9wAcOHLjzzjs3b978q1/96uc///lVV13V0NAwderUzMzMm2++uWvXrn7VA7IlwH+6mpqaxvOUhLKzs/v37x9dFVm3bl30yPXQsccee/zxx4fLtbW1y5Ytq6ury83NPXLkSOPeunTpcsoppwRB8NBDD23ZsiW+zvr16+Pnroy2fvjw4aP2k1DSuXPnsOcoEgdBsHfv3pUrVza+ptS5c+fCwsL4iW07d+4czpMZyc/P/8uz5caNG6O4Fe5G27Ztv67ypk2bojlCk5OTDxw4EARBRkZG3759O3XqFFU7cuRIampqVPnfTHqhffv2rVix4qir0tPTTzzxxOihi5FOnTr16tWrefPmUcnmzZsbB/KjBok+ffoEja7abdmypfFEMt+QLVu0aNG7d++ePXuGL1977bWoeWFhYdeuXTt27PjFF1+EkXLr1q3hquhTF2rfvn38ByD6/KSlpa1ZsyaaYynBtm3bwm1FT2vctm3bihUrEi6IRVJTU3v27FlRURGe5H379n3d+9KuXbu+fftmZGSEC/Gr2rZtG64KgqBZs2Y9evR4//33P/3003BV/FH06NEjPJ+bNm1KOKXhCQkNHDgwYev5+fkJZ2Pp0qWHDh1atWrVmWee2fhE7dy5c9WqVR9++GFubm6HDh3Ci5yrV6/+d38NSkkpLCw85ZRTqqurW7ZsuXPnzp07d4arWrZs2a5du/DTHgRBZWVldFE0OTn5+OOPb7xX0aqESZUTmkdisdiaNWvWrVuXnJx83HHHBUFQX18fXtDu37+/3/PA3xz3WwIAACBbAgAA8N/NmFjgb1vnzp1Hjx69adOmrVu3Tp48ORaL9erVq/FUOkEQnHHGGS1atJg3b978+fPDaX6CIPjzn//8b04AEzVfsWLFE0888fnnn4clI0aMCEcABkGwcePGefPmRcPnFixY8C//8i9HnYslsnDhwrZt2xYVFX3wwQe1tbVFRUUJk4KE2rdvP3r06F27ds2aNau+vn7RokXR3EUdOnQoKiqK7hEdNmxYt27djtpJvHbt2hUVFUXP9gzHiAZBMGTIkE2bNr3++utHbRXuakZGRufOncOxkdu3b3/yySfjB47W19efd9550fw6dXV1paWlQRB8/PHHeXl5RUVFWVlZzZs3nzVr1vDhw/Py8i6++OKqqqqKiorXX399z549bdq0GT16dPzTAisqKp5++ully5a1adOmqKioZcuWqampc+bMCZt///vfr6ysTE1Nffnll5ctW5abm1tUVLRq1apwsPQHH3wQbj1y6qmnDhgwIOG4du3a9eyzz3700UetWrUaPXp0/OG0a9cuJydnyZIl0djOhoaG8NTV1dXFdzJgwICJEyfOmzevqqqqurr6ueee27dvX+NRkX+J7OzsCy+8cMiQITU1NfPmzausrGzZsmVRUdHGjRvLy8v/9Kc/xY8s/TrLli17+eWXwwHSu3fvnjlzZkZGRvgEzuXLl0dPpMzMzCwqKorumE1LS3vppZeGDh06aNCghA4//vjjF154YfDgwSeffHJ2dnb88OlPPvkkOs/p6emjR4/esWPHK6+8Ej+mt0+fPkOHDo3vsGXLlo8//nh4v2hoxYoVYT99+vQZNmxYfOUVK1Y89thjo0eP7tChQ1Ty9ttvDxgwoGfPnunp6R06dEhOTr7sssvmzZuXnZ19+umnh5/nqIf9+/fPnj37iy++2LdvXzhgOzU1taioqFOnTk2aNFm+fPnq1avDVT169BgxYkT4m+GDDz6YM2dO27Ztw1P3+eefL1iw4OvOedOmTYuKigoKCpKSkj799NNDhw5deeWVBQUF8fNv/b/vXikpRUVF0Zj2U0455eDBg/PmzVu/fv3BgwfXrVsXPog1CILjjz9+1KhRfs8DfzNiAP9BysrKwslX/xJjx449ePBgLBZ76aWXUlJSnn322XDhmWeeCXubNGnSueee29DQEL+J2bNnx0/OGQTBOeecU19ff/HFF48ZM2bfvn1RzUsuuSRhi0888cQrr7zydVMvnnXWWXv27InFYnPnzo2fc+XRRx+N+nzttdfiJ+l55JFHolXz5s0LZ1sdNWpUdXX1FVdcEVUbOXJkVVVVVPPKK6+Mz6uVlZVXXXVVuBCLxebPn58wW+bpp59eUVHx4x//uPE+Dx8+PJzkNkFJSUlUZ+jQodu2bYvFYu+8804YCYYMGbJ169ajvoPvvfde+/bt77777qjkX//1X8Mv9KeddtqmTZui8nD6lgSnnnrqhg0bojo/+clP4tPXunXrYrHYkiVLCgoK7rjjjqja0qVLwy/ZJ5988tq1a6Pyn//851Hzk046qby8PBaLLVu2rGvXrtOmTYuqLV++PJx1pm/fvl9++eXUqVO/7iN3yy23RK0+/fTThLsfe/Xq9fnnnzc+J7/+9a+jOj169Pjss89uvPHGcCG+2p///Ofo9ssgCH71q199/vnnvXr1it/E8ccf/+mnn958883hy1/+8pff8NP05Zdfhjc9duvWbfny5bfeemvC4dxwww3l5eVhFD/22GM/+uijqO3tt9+eUPlnP/tZuOqOO+6ICgsKCpYsWRK1uuuuu4455pgPPvggfjc2bNhw6qmnBkHQsWPHxYsXR+W/+93vjvp/kPfee+/uu+9OKJ8yZUrC0d17771t27Z955137r333oTKJSUlYZ37778/KmzTps2CBQui5qWlpbm5uW+//XZ8nzt37hwxYsSPfvSjhG098MADjXc1JyfnzTffjMViVVVVI0eOjMqvuOKKsNXDDz8cloT/sYrFYo888khULTMz87XXXos28eijj2ZkZMydOzcWi+3evXv06NE//OEPw1WPP/54462npaW98sor8TtZV1d39tlnN6558cUXhxWeeuqpv+T3atOmTWfNmvXMM8+kpKS89NJL8Zs4ePDg2LFjJ0yYEL6cMWNGkyZNXnjhhVgsdujQoXBesaSkpLKyMn/LgL+aMbEAAAB8W8bEAv9hunTpEv6P/y+p3K9fv/AiZ0FBweWXX961a9emTZuGC2GFESNGNDQ0JDxwsqCg4LLLLotGXQZBcOKJJyYnJw8fPnzfvn3xQ2GHDx+ecIWze/fumZmZl156aTRyNV6vXr3CRzV27NjxBz/4QTScNf7qVrgqeshB/KoOHTpccskl9fX1PXr0aNas2ZAhQ6LzcMIJJ8TvyZAhQ6LJZgsLC1NTU4cMGdK9e/fwmSjt27e/+OKLoyG74VaaN28+ePDgxmN3jzvuuPi5UiODBg2KdrJ79+7hKNm2bdtedNFFtbW13zBuNj8/f9KkSfFX2/Ly8iZNmlRdXd21a9doGG0QBAMHDpw8eXLjD0B8nVNPPTWqE42kbdOmzYQJE6KBuEEQ5ObmTpgwobKysqCgIP6y8IABA6LmxxxzTLiqdevW48ePP/HEE6NqYUlFRUWnTp2ysrL69+/feMdC8XOftmrVaty4cfEzpnbo0OGoT+M86aSTog7bt2+fnZ190kknxWKxhMrZ2dnnn3/+aaedFr4Mx46ef/758ROitm3btlWrVv369Qs7/OaJQLOyssaOHdu/f/+8vLzWrVv37ds34bgGDBiQmZn5ve9976STTmrTpk384yL79OmTUDma0TR+VevWrdu0aRPV6d2794QJE+JLgiBIT0//7ne/27t375ycnLy8vPjKjc9zdnZ2fn5+r169ElZFpyXSs2fPiy66qG3btj179kyoHI3I7dGjR7QqMzOzXbt2UZ0ePXr8f+3dMYqDQBiA0X8QJyFlSglrYcCLCCpeQbDwRlvsXdNtIYgkBLLlwnvlSEyUDPjBMM7zfByJiNPpNE3T8aU4+wR8/amXy6WqqojIOY/juC9P3VfStm27fWpfzbuPRMT5fL7dbsdJuizLNlKW5TAM2yqGbZK+fnvO+bjBckQURdH3/dMVxWFD3fv9/u6P/XSeuq4fj8e6rnVdHw+llLqu219I2zTNuq7bhW+HrtdrSul1R2uAz6UPnwIBAADgHWtiAQAA0JYAAABoSwAAALQlAAAA2hIAAAC0JQAAANoSAAAAbQkAAIC2BAAAAG0JAACAtgQAAEBbAgAAoC0BAABAWwIAAKAtAQAA0JYAAABoSwAAANCWAAAAaEsAAAC0JQAAANoSAAAAtCUAAADaEgAAAG0JAACAtgQAAABtCQAAgLYEAADgX7fl989XSikltwQAAIA/+gWEktthN9jxvgAAAABJRU5ErkJggg==" />
          <div class="t m0 x1 h2 y1 ff1 fs0 fc0 sc0 ls1 wsc">Form I-90 02/27/17 N</div>
          <div class="t m0 x1 h3 y91 ff2 fs1 fc0 sc0 ls1">1.</div>
          <div class="t m0 x1 h3 y92 ff2 fs1 fc0 sc0 ls1">2.</div>
          <div class="t m0 xd h8 y91 ff1 fs1 fc0 sc0 ls1 wsc">Location where you applied for an immigrant visa or </div>
          <div class="t m0 xd h8 y93 ff1 fs1 fc0 sc0 ls1 wsc">adjustment of status:</div>
          <div class="t m0 xd h8 y94 ff1 fs1 fc0 sc0 ls1 wsc">Location where your immigrant visa was issued or USCIS </div>
          <div class="t m0 xd h8 y95 ff1 fs1 fc0 sc0 ls1 wsc">office where you were granted adjustment of status:</div>
          <div class="t m0 x1 h3 y96 ff2 fs1 fc0 sc0 ls1">4.</div>
          <div class="t m0 x1 h3 y97 ff2 fs1 fc0 sc0 ls1">5.</div>
          <div class="t m0 xd h8 y96 ff1 fs1 fc0 sc0 ls1 wsc">Have you ever been in exclusion, deportation, or removal </div>
          <div class="t m0 xd h8 y98 ff1 fs1 fc0 sc0 ls1 wsc">proceedings or ordered removed from the United States?</div>
          <div class="t m0 x1d h8 y99 ff1 fs1 fc0 sc0 ls1 ws1c">No<span class="_ _c"></span>Yes</div>
          <div class="t m5 xd h8 y9a ff1 fs1 fc0 sc0 ls1 wsc">Since you were granted permanent residence, have you </div>
          <div class="t m5 xd h8 y9b ff1 fs1 fc0 sc0 ls1 wsc">ever filed Form I-407, Abandonment by Alien of Status as </div>
          <div class="t m5 xd h8 y9c ff1 fs1 fc0 sc0 ls1 wsc">Lawful Permanent Resident, or otherwise been determined </div>
          <div class="t m5 xd h8 y9d ff1 fs1 fc0 sc0 ls1 wsc">to have abandoned your status?</div>
          <div class="t m0 x1d h8 y9e ff1 fs1 fc0 sc0 ls1 ws1c">No<span class="_ _c"></span>Yes</div>
          <div class="t m0 x1 h3 y9f ff2 fs1 fc0 sc0 ls1 wsc">NOTE: <span class="ff1">If you answered</span> &quot;Yes&quot;<span class="ff1"> to</span> Item Numbers 4. <span class="ff1">or </span>5. </div>
          <div class="t m0 x1 h8 ya0 ff1 fs1 fc0 sc0 ls1 wsc">above, provide a detailed explanation in the space provided in </div>
          <div class="t m0 x1 h3 ya1 ff2 fs1 fc0 sc0 ls1 wsc">Part 8. Additional Information<span class="ff1">.</span></div>
          <div class="t m0 x10 h3 ya2 ff2 fs1 fc0 sc0 ls1">6.</div>
          <div class="t m0 x10 h3 ya3 ff2 fs1 fc0 sc0 ls1">7.</div>
          <div class="t m0 xf h8 ya4 ff1 fs1 fc0 sc0 ls1">Height</div>
          <div class="t m0 x10 h3 ya5 ff2 fs1 fc0 sc0 ls1 ws1d">9.<span class="_"> </span><span class="ff1 wsc">Weight </span></div>
          <div class="t m0 x1e h8 ya4 ff1 fs1 fc0 sc0 ls1 ws1e">Feet<span class="_"> </span>Inches</div>
          <div class="t m0 x10 h3 ya6 ff2 fs1 fc0 sc0 ls1">8.</div>
          <div class="t m0 x1f h8 ya7 ff1 fs1 fc0 sc0 ls1">Pounds</div>
          <div class="t m0 x1 h3 ya8 ff2 fs1 fc0 sc0 ls1 ws1f">3.b.<span class="_"> </span><span class="ff1 wsc v0">My previous card was issued but never received.</span></div>
          <div class="t m0 x1 h3 ya9 ff2 fs1 fc0 sc0 ls1 ws1">3.c.<span class="_"> </span><span class="ff1 wsc">My existing card has been mutilated. </span></div>
          <div class="t m0 x1 h3 yaa ff2 fs1 fc0 sc0 ls1 wsa">3.d.<span class="_"> </span><span class="ff1 wsc v4">My existing card has incorrect data because of DHS </span></div>
          <div class="t m0 xe h8 yab ff1 fs1 fc0 sc0 ls1 wsc">error. (Attach your existing permanent resident card </div>
          <div class="t m0 xe h8 yac ff1 fs1 fc0 sc0 ls1 wsc">with incorrect data along with this application.)</div>
          <div class="t m0 x1 h3 yad ff2 fs1 fc0 sc0 ls1 ws1">3.e.<span class="_"> </span><span class="ff1 wsc v4">My name or other biographic information has legally </span></div>
          <div class="t m0 xe h8 yae ff1 fs1 fc0 sc0 ls1 wsc">changed since the issuance of my existing card. </div>
          <div class="t m0 x1c h7 yaf ff2 fs5 fc0 sc0 ls1 wsc">Part 3. Processing Information</div>
          <div class="t m0 x1c h7 y49 ff2 fs5 fc0 sc0 ls1 wsc">Part 2. Application Type <span class="ff1">(continued)</span></div>
          <div class="t m4 x1 h3 yb0 ff2 fs1 fc0 sc0 ls1 wsc">Section B. <span class="ff1">(To be used</span> <span class="ff1">only</span> <span class="ff1">by a conditional permanent resident.)</span></div>
          <div class="t m0 x1 h3 yb1 ff2 fs1 fc0 sc0 ls1 ws12">3.a.<span class="_"> </span><span class="ff1 wsc">My previous card has been lost, stolen, or destroyed.</span></div>
          <div class="t m0 xd h3 yb2 ff2 fs1 fc0 sc0 ls1 wsc">Port-of-Entry where admitted to the United States:<span class="_ _d"></span>3.a.1.</div>
          <div class="t m0 x10 h9 yb3 ff4 fs5 fc0 sc0 ls1 wsc"> Biographic Information</div>
          <div class="t m0 x1b h8 yb4 ff1 fs1 fc0 sc0 ls1 wsc">Not Hispanic or Latino</div>
          <div class="t m0 x1b h8 yb5 ff1 fs1 fc0 sc0 ls1 wsc">Hispanic or Latino</div>
          <div class="t m0 xf h3 yb6 ff1 fs1 fc0 sc0 ls1 wsc">Ethnicity (Select <span class="ff2">only</span> <span class="ff2">one</span> box)</div>
          <div class="t m0 xf h3 yb7 ff1 fs1 fc0 sc0 ls1 wsc">Race (Select <span class="ff2">all</span> <span class="ff2">applicable</span> boxes)</div>
          <div class="t m0 x1b h8 yb8 ff1 fs1 fc0 sc0 ls1 wsc">Native Hawaiian or Other Pacific Islander</div>
          <div class="t m0 x1b h8 yb9 ff1 fs1 fc0 sc0 ls1 wsc">American Indian or Alaska Native</div>
          <div class="t m0 x1b h8 yba ff1 fs1 fc0 sc0 ls1">White</div>
          <div class="t m0 x1b h8 ybb ff1 fs1 fc0 sc0 ls1">Asian</div>
          <div class="t m0 x1b h8 ybc ff1 fs1 fc0 sc0 ls1 wsc">Black or African American</div>
          <div class="t m0 x1b h8 ybd ff1 fs1 fc0 sc0 ls1 ws20">Black<span class="_"> </span>Brown</div>
          <div class="t m0 x1b he ybe ff1 fs1 fc0 sc0 ls1 ws21">Maroon<span class="_"> </span><span class="v0">Pink</span></div>
          <div class="t m0 x20 h8 ybf ff1 fs1 fc0 sc0 ls1 ws1c">Hazel<span class="_ _e"></span>Green</div>
          <div class="t m0 x21 h8 ybd ff1 fs1 fc0 sc0 ls1">Blue</div>
          <div class="t m0 x10 hf yc0 ff2 fs1 fc0 sc0 ls1 ws22" style=" left: 218px; bottom: 521px;">
            10.<span class="_"> </span><span class="ff1 wsc v0">Eye Color (Select <span class="ff2">only one</span> box) </span>
          </div>
          <div class="t m0 x20 h8 yc1 ff1 fs1 fc0 sc0 ls1">Unknown/Other</div>
          <div class="t m0 x1b h8 yc2 ff1 fs1 fc0 sc0 ls1">Gray</div>
          <div class="t m0 x15 h2 y1 ff1 fs0 fc0 sc0 ls1 wsc">Page 3 of 7</div>
          <div class="t m0 x1 h3 yc3 ff1 fs1 fc0 sc0 ls1 wsc">Complete <span class="ff2">Item Numbers</span> <span class="ff2">3.a.</span> and <span class="ff2">3.a1.</span> if you entered the </div>
          <div class="t m0 x1 h8 yc4 ff1 fs1 fc0 sc0 ls1 wsc">United States with an immigrant visa. (If you were granted </div>
          <div class="t m0 x1 h3 yc5 ff1 fs1 fc0 sc0 ls1 wsc">adjustment of status, proceed to <span class="ff2">Item Number 4.</span>)</div>
          <div class="t m0 xd h8 yc6 ff1 fs1 fc0 sc0 ls1 wsc">City or Town and State</div>
          <div class="t m0 x1 h10 yc7 ff2 fs1 fc0 sc0 ls1 ws0" style="left: -65px; bottom: 395px;">
            3.a.<span class="_"> </span><span class="ff1 wsc">Destination in the United States at time of admission<span class="_ _f"> </span><span class="v5">White</span></span>
          </div>
          <div class="t m0 xf h3 yc8 ff1 fs1 fc0 sc0 ls1 wsc">Hair Color (Select <span class="ff2">only one</span> box) <span class="_ _10"></span><span class="ff2">11.</span></div>
          <div class="t m0 x12 h8 yc9 ff1 fs1 fc0 sc0 ls1">Black</div>
          <div class="t m0 x1b h8 yca ff1 fs1 fc0 sc0 ls1 ws23">Brown<span class="_"> </span>Red</div>
          <div class="t m0 x22 h8 ycb ff1 fs1 fc0 sc0 ls1">Unknown/Other</div>
          <div class="t m0 x1b h8 ycc ff1 fs1 fc0 sc0 ls1">Sandy</div>
          <div class="t m0 x12 h8 yca ff1 fs1 fc0 sc0 ls1">Gray</div>
          <div class="t m0 x22 h8 yc9 ff1 fs1 fc0 sc0 ls1 wsc">Blond<span class="_ _11"></span>Bald (No hair)</div>
          <div class="t m0 x23 h7 ycd ff2 fs5 fc0 sc0 ls1 wsc">Part 4. Accommodations for Individuals with </div>
          <div class="t m0 x23 h7 yce ff2 fs5 fc0 sc0 ls1 wsc">Disabilities and/or Impairments <span class="ff1">(Read the </span></div>
          <div class="t m0 x23 h11 ycf ff1 fs5 fc0 sc0 ls1 wsc">information in the Form I-90 Instructions before </div>
          <div class="t m0 x23 h11 yd0 ff1 fs5 fc0 sc0 ls1 wsc">completing this part.) </div>
          <div class="t m0 x10 h3 yd1 ff2 fs1 fc0 sc0 ls1 ws24">1.<span class="_"> </span><span class="ff1 wsc">Are you requesting an accommodation because of your </span></div>
          <div class="t m0 xf h8 yd2 ff1 fs1 fc0 sc0 ls1 wsc" style=" left: 243px; bottom: 271px;">
            disabilities and/or impairments? <span class="_ _12"> </span><span class="ws1c v6">No<span class="_ _13"></span>Yes</span>
          </div>
          <div class="t m0 x10 h3 yd3 ff2 fs1 fc0 sc0 ls1 wsc">1.a. <span class="_ _14"> </span><span class="ff1 v4">I am deaf or hard of hearing and request the </span></div>
          <div class="t m0 x1b h8 yd4 ff1 fs1 fc0 sc0 ls1 wsc">following accommodation (If you are requesting a </div>
          <div class="t m0 x1b h8 yd5 ff1 fs1 fc0 sc0 ls1 wsc">sign-language interpreter, indicate for which </div>
          <div class="t m0 x1b h8 yd6 ff1 fs1 fc0 sc0 ls1 wsc">language (for example, American Sign Language)): </div>
          <div class="t m0 x10 h8 yd7 ff1 fs1 fc0 sc0 ls1 wsc">If you answered &quot;Yes,&quot; select any applicable boxes:</div>
          <div class="t m0 x10 h3 yd8 ff2 fs1 fc0 sc0 ls1 wsc">NOTE: <span class="ff1">If you need extra space to complete this section, use </span></div>
          <div class="t m0 x10 h3 yd9 ff1 fs1 fc0 sc0 ls1 wsc">the space provided in <span class="ff2">Part 8. Additional Information</span>.</div>
        </div>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 28px; left: 345px; ">@BiographicInformation.Hispanic </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 43px; left: 345px; ">@BiographicInformation.NotHispanic </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 76px; left: 345px; ">@BiographicInformation.White </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 92px; left: 345px; "> @BiographicInformation.Asian </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 106px; left: 345px; ">@BiographicInformation.Black </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 121px; left: 345px; ">@BiographicInformation.AmericanIndianORAlaskaNative </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 136px; left: 345px; ">@BiographicInformation.NativeHawaiianOROtherPacificIslander </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 159px; left: 479px; ">@BiographicInformation.HeightFeet </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 159px; left: 550px; ">@BiographicInformation.HeightInch </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 183px; left: 529px;letter-spacing:59px; ">@BiographicInformation.Weight </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 223px; left: 345px; ">@BiographicInformation.EyeColor.Black </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 238px; left: 345px; ">@BiographicInformation.EyeColor.Gray </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 253px; left: 345px; ">@BiographicInformation.EyeColor.Maroon </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 223px; left: 411px; ">@BiographicInformation.EyeColor.Blue </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 238px; left: 411px; ">@BiographicInformation.EyeColor.Green </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 253px; left: 411px; ">@BiographicInformation.EyeColor.Pink </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 223px; left: 471px; ">@BiographicInformation.EyeColor.Brown </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 238px; left: 471px; ">@BiographicInformation.EyeColor.Hazel </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 253px; left: 471px; ">@BiographicInformation.EyeColor.Unknown/Other </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 289px; left: 345px; ">@BiographicInformation.HairColor.Bald(No hair) </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 304px; left: 345px; ">@BiographicInformation.HairColor.Brown </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 319px; left: 345px; ">@BiographicInformation.HairColor.Sandy </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 289px; left: 435px; ">@BiographicInformation.HairColor.Black </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 304px; left: 435px; ">@BiographicInformation.HairColor.Gray </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 319px; left: 435px; ">@BiographicInformation.HairColor.White </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 289px; left: 489px; ">@BiographicInformation.HairColor.Blond </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 304px; left: 489px; ">@BiographicInformation.HairColor.Red </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 319px; left: 489px; ">@BiographicInformation.HairColor.Unkown/Other </p>


        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 100px; left: 169px;">&#10004; </p>
        <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
      </div>
      <div id="pf4" class="pf w0 h0" data-page-no="4">
        <div class="pc pc4 w0 h0">
          <img class="bi x0 y0 w1 h1" alt="" src="data:image/png;base64,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AAAAgGwJAAAAACBbAgAAAADIlgAAAAAAsiUAAAAAAGRLAAAAAADZEgAAAABAtgQAAAAAkC0BAAAAACBbAgAAAADIlgAAAAAAsiUAAAAAgGwJAAAAAADZEgAAAABAtgQAAAAAkC0BAAAAAGRLAAAAAADIlgAAAAAAsiUAAAAAgGwJAAAAACBbAgAAAABAtgQAAAAAkC0BAAAAAGRLAAAAAADZEgAAAAAAsiUAAAAAgGwJAAAAACBbAgAAAADIlgAAAAAAkC0BAAAAAGRLAAAAAADZEgAAAABAtgQAAAAAgGwJAAAAACBbAgAAAADIlgAAAAAAsiUAAAAAAGRLAAAAAADZEgAAAABAtgQAAAAAkC0BAAAAACBbAgAAAADIlgAAAAAAsiUAAAAAgGwJAAAAAADZEgAAAABAtgQAAAAAkC0BAAAAAGRLAAAAAADIlgAAAAAAsiUAAAAAgGwJAAAAACBbAgAAAABAtgQAAAAAkC0BAAAAAGRLAAAAAADZEgAAAAAAsiUAAAAAgGwJAAAAACBbAgAAAADIlgAAAAAAkC0BAAAAAGRLAAAAAADZEgAAAABAtgQAAAAAgGwJAAAAACBbAgAAAADIlgAAAAAAsiUAAAAAgGwJAAAAAADZEgAAAABAtgQAAAAAkC0BAAAAAGRLAAAAAADIlgAAAAAAsiUAAAAAgGwJAAAAACBbAgAAAABAtgQAAAAAkC0BAAAAAGRLAAAAAADZEgAAAAAAsiUAAAAAgGwJAAAAACBbAgAAAADIlgAAAAAAkC0BAAAAAGRLAAAAAADZEgAAAABAtgQAAAAAgGwJAAAAACBbAgAAAADIlgAAAAAAsiUAAAAAAGRLAAAAAADZEgAAAABAtgQAAAAAkC0BAAAAACBbAgAAAADIlgAAAAAAsiUAAAAAgGwJAAAAAADZEgAAAABAtgQAAAAAkC0BAAAAAGRLAAAAAADIlgAAAAAAsiUAAAAAgGwJAAAAACBbAgAAAABAtgQAAAAAkC0BAAAAAGRLAAAAAADZEgAAAAAAsiUAAAAAgGwJAAAAACBbAgAAAADIlgAAAAAAkC0BAAAAAGRLAAAAAADZEgAAAABAtgQAAAAAgGwJAAAAACBbAgAAAADIlgAAAAAAsiUAAAAAAGRLAAAAAADZEgAAAABAtgQAAAAAkC0BAAAAACBbAgAAAADIlgAAAACAPzvt3frETExMeHUBAAAA/KnIsny3PjWuWwIAAAAAyJYAAAAAgD+ayV18TRYAAAAAcHtw3RIAAAAAQLYEAAAAAJAtAQAAAABkSwAAAAAA2RIAAAAAALIlAAAAAIBsCQAAAAAgWwIAAAAAyJYAAAAAAJAtAQAAAABkSwAAAAAA2RIAAAAA8FempQsA/LekpqbGxcXJsvxLKvfr1y8qKsrU1PT06dNxcXGzZ8/W6XRxcXGzZs0aNGiQJElr165tamqKjo7Wav///6nS09NjY2NbW1uNd9i7d+/o6GgzM7MzZ87ExsY++eSTNjY2sbGx06ZNCwsLkyRp/fr13333XYcnM3PmzCFDhojHZ8+ejYuLa2xsFD/OmDHjgQcekCRpw4YNFRUV0dHRCQkJKSkpYmtISEhUVNSnn3565MgRg3327NkzOjra2traoPzjjz8+fPiwJEnTpk0bNmyYwdaLFy/GxsbW1tYGBgZGR0fb2tqqN8XFxdXU1Igfn3jiiREjRkiStHnz5gMHDkiSNHXq1JEjR0qStGXLlvz8/KioKAcHh8zMzLi4uKqqqh49ekRHRzs4OIjmW7du3b9/v/rQU6ZMCQ8PlyRp27ZtycnJotDf3z86OtrJycngPBMSErKysqKiopKTk/ft26feNHHixIceekiSpO3bt3/zzTcGDbt27RoVFeXq6pqdnR0XF1dSUiLKH3vssdGjR6trJiYm7tmzR2zq2bNnXFycXq/v0qVLdHR0SkqK2KR49NFHx4wZI0nSjh07du3a1eGr/M9//nPs2LHicX5+flxcXHFxsXE1b2/v6OhoT0/Pa9euxcbGFhUVKZu8vLyioqJOnTqVmpoaFRXl7e0tyr/44osvvvhCPPb09IyKivLx8SkqKoqNje3bt+8///nPDs/nq6++2rlzpyRJY8aMCQsLi42Nzc/PV7a6u7tHR0d36dJF/Lhr164dO3ZIkjR69OjHHntMFN64cSMuLi43N1dp5erqGh0dfeHChcOHD0dHR/v5+SmbSkpKYmNjAwMDJ06cqD6NvXv3fvrpp+qSBx98cNKkSeJxWVlZbGxs9+7dw8PD4+LisrKynJycoqOj/f39y8vLY2Njs7KyDJ5XeHj4gw8+GBcXd+XKFeNn7eDgEBUVdc8994gf9+/fv3XrVkmSRo4cOXXqVEmSvv322y1btoitdnZ20dHRAQEBBjs5cODA5s2bxWNbW9uoqKigoKCamprY2NhOnTpNmzZNXfnQoUObNm0Sj62traOjo2/cuKEuiYqKCg4Orquri42NdXV1nT59uthUV1cXFxfn4uKilNxMSkrKxo0bxWMLC4uoqKiqqqotW7ZER0dXVVVt2LBBkqTBgwfPmjWrw+bffffd+vXrxWOdThcdHR0aGmpQ5/jx4+vWrfv5T3VabVRUVFNT04cffhgVFdWvXz9lU1tbW1xcnFarnTt3riRJ33///bp166Kiovr379/e3h4bG3v69GkTE5OoqKi//e1v/DkD8BvJAPBfkpSUZGJi8gv/8xk3blxLS4ssy59//rlWq922bZt4sHXrVrG3yZMnjx07tqmpSX2IL7/80szMrMMdjh49ur6+XpblXbt2WVhYbNq0affu3ZaWlps2bRJt//Wvf93sZD766CPlEHv37rWxsVE2bdiwQZRPnz49PDy8qqpqxowZytZ//OMflZWVM2fONN7niBEjysvLjXtp9uzZosLatWuNtx48eNDZ2VmSpKFDh5aUlKg3HTp0yMXFRdl/bGysKI+KihIla9asESXR0dGDBw8uLi6WZTklJcXd3V2SpLCwsKKiImVvzz77rMEJv/POO2LTvHnzlML77ruvoKDA+Dyfe+65gQMH5ufnP//88wb7eeutt0SdF154wbhb+vfvn5OTI8tyamqqr6+vUr569WqDQ7z00kti06pVq06fPt21a1dJkkJDQ69cufLyyy8b7Pb1118XrWJiYm72Ki9fvlzZ+dmzZ5V4YyA4OPjixYuyLGdkZAQGBqo3BQUFnT9/funSpeKBsrdXX31VqRMQEHDu3DlZli9evBgcHLxkyZKb/b4sX75cNFm8ePGlS5d69eqlPpa/v396erpS+fXXXxflL7/8slKYlZXVp08fdSs/P79Tp06tXr1aPFAfLjs7u1+/fi+++KLBabz55psGPfDCCy8oW/Py8gYMGPD888/n5+cPHDhQZO8TJ07IslxQUHDfffcZd+C8efOuXbsmviEy5uHhcfToUWX/7733niiPjo4WJe+//75S2c3N7ciRI8ZdFxsbq9RxcXE5dOiQLMslJSVDhw6dM2eOQeW1a9cqlR0dHb/99tv4+Hh11t2/f78sy+Xl5SNGjJg1a5bSsKKiYuTIkTNnzvzZ//pEehRsbGz27t27ceNGa2vrr7/++qOPPhLl06ZNu1lzJeiKaLpr1y7jOkqWvjWdTvfFF19s3bpVq9V+/vnn6j20tLSMGzdu4sSJ4seEhASNRrNjxw5ZlltbW8ePHy9JkomJSVJSEn/LAPxmjIkFAAAAAPxeZEsAAAAAwO/FfEsAd4mSkpLDhw+bmZkVFhYOGTKkvLy8oaFBPBDTEYuKipydnUNCQi5dumQw0e7ixYs//vhjcHCwem6nk5NTSEhIZWWl0rysrOzIkSN2dnbDhw8XdXr37m1qatrh+ZSXl6ekpNjY2Ij9ZGVlNTQ0hISEKBUyMzPFngMCApSZe46OjkOGDKmuru7du7dOpxP7OX/+fNeuXR0dHQcPHlxdXS1q1tbWiuZWVlbifOrq6tLS0oKDg9Wn4eDgMHjw4IqKiuDgYDGcuKKi4vz58xYWFqLVpUuXrl27JknS5cuXxQ7z8/Pt7e1DQkLMzc2DgoLMzc0vX75cVVUVEhJiYWFxi5fAzs4uJCSkqalJ7CcvL8+4TnV19fHjxyVJsrW1HTRoULdu3aqrqzMyMrKyslJTU0NCQiwtLQ2aZGVl2dvbNzQ0SJJUU1Nz4sSJ3NxcGxubkJAQKyurmpoa0VwcVKPRKK+OcPXqVWVGoqjcqVMn4xOztrYOCQmxtrZ2cXE5d+6cubm5tbX1wIEDPT09RYXs7Oza2toffvhBkqTg4OCMjIzi4mLRys/PTzmoj4+PepJtTk6OODFjV69etbKyCg4OFsN9b6a+vj4jI6O1tVUcwtTUVOzQ19dXGYJuYWEREhJiZ2fn4eFha2vbpUuX0NDQn376qbKy0tLSUmyysLDo37+/v7+/aJKXlyfmQyqzIjt37uzt7X3+/Hnjc8jLy/vuu++qqqokSWpsbDx16lRdXV1NTY2/v7+VlZVSrampKSMjQ93QzMwsJCREmeUr+jkrK6upqcnc3NzgvWqsubk5LS3Nw8PDz88vIyOjoqJClF+6dMmgTltbW0NDg6+vrzLU+dq1a1evXlX/xkmS1NLSkp6eXlRUpNVqQ0JCnJyczM3Nc3Nzf/rpJ29v79DQUA8Pj5/9r6awsPDKlSshISFi+LqB1tbWH3/8sayszHhTW1tbRkaGTqfr2bOnuqS8vFx5/5iZmamHvgPAHYZhwQDujvmWOp3O2dnZxcXl0UcfLSgomDFjxj//+c/8/PwZM2a4uLi4uLiYm5uPGDEiNzd3woQJBm1tbGwmTJhQU1Ojnm85bNiw7Ozs2bNnK83FIT744AP9/6eysrKtra3D+ZY6nc7JycnFxWX8+PEVFRXPP//8uHHjysvLlfmWIsa4uLh8/PHHyhNsamoqLS1V9izL8rFjx3r06LFx40Zlk/DMM8+I5u+8844oefbZZx9++OEbN26o51s2NzeLVhUVFWKHJ06cCAoK+j//5/+IVsr9RZTzESHk3LlzolVra+vixYsjIiIKCwtvPd+yT58+Z86cWbBggdiPcUqUJEmr1To6Or7//vvNzc1lZWV6vX7//v0+Pj4iIYupmAbzLa2srBwcHDQajUhWjo6OIi+dPHlSr9cfPHjQz8/PyspKHHT58uX6/+m5554T+1m+fHlGRsaAAQPeeust4/mWAQEBx48f1+v13333Xf/+/d98882Wlpby8nJlPwsWLDA1NXVwcFi6dOmJEycGDBjg4uJy3333Xbx4sba2VqlWXl4u3thivqWlpaXLTVhZWXXr1u3w4cO1tbW3mG+ZlZX197//fdGiRWL/K1asEM2XLVumzLfs0qXLt99+q9fry8rKmpub6+rq0tPThwwZ4uLiEhoaKvbT2tpaXl5eW1srunfNmjXKaYgjPv300+np6aGhocbzLS0sLBwdHcU3LxqNxt7e3sXFJSgoKDk5Wd3V586d69+/v3q+pbu7++7du9V1Lly48I9//EM0P3HixK3nW5qYmNjb2y9cuFCv148ZM0bpOnV6NzExsbOzc3Fx8ff33717t/gtlmX5o48+8vf3T0lJUc+3FJWtra3t7e137Nih1+uzsrIefvjh5557rq2trbKysrq6+mfnW27evNnX1/fAgQMdzrcUX7LY2NgYz7esra2dOHFiVFSU0rCurm7SpEkzZsxQ+qekpKSxsZH5lgDuUFy3BHCXaGlpEdcKGhsbnZ2dW1palAelpaXqawLGF99qa2uV64HqSy4uLi6tra1Kc0mSysrKdDqdq6vrLzmf8vJycaVOlmVxCFl1E926urq6ujpxwuqDGlwMEftpbGw02NTW1iZOTKvVivNpa2urqqqS/+d9ekUeNriuUl5ebmpqKlopCVA5HyUYK0+zrq6uqqqqvb39Zz/XOjk5ybKs7jHjqzoVFRUNDQ2isriyampqWl9fX1lZ2eEh6uvr6+vrlWctLl5ptVpxho6OjqK5qGNiYmLw6qgvrInm4hJoh6HX1dX1+vXrNTU19fX1okR9wU3EDxEeampqSktLXV1d29rarK2tjW8ILDQ0NHR4OEFE5Zu1Fdrb28VBxfPSaDSie5U+UfajPHGdTmdvb19XV1daWmpjYyPuqyzqqE/M4GWysrJycnISV8sNNDY2Ku/S9vZ2cQHT3NzcxsZG3dvNzc0GzTUajYODg7pOa2trfX19aWmpVqvt8IbPBl9/V1VV1dXViQcdvq9kWRa/vLIsW1lZKTfiamxsFDm/w8qOjo729vaurq5arbahoaG2tlZk5l/yX01TU1NZWZnBng0uzos3TIebzM3NDUp+4X8pAPDnR7YEcOfp0aOHqalpZmamLMtOTk4BAQFZWVmtra0BAQEajSYoKEij0fTo0aOqqko8EGuQXL58uby8/MSJEzdu3FB25ejoGBAQYGpq2rNnT3Fl7GdduXLl2LFj6ub+/v7iEOo6TU1NAQEBWq3WYKitsaysLGWHgr+/f4fjNkVlMaC3qKjIzs4uMDCww5pVVVUnT550cnKyt7cPCAgoKChQ1tI4d+5cc3Pz1atXz549q17dwc/Pz8vLS5Kk7Ozs6urqkydPurq62tnZBQQE+Pn5NTQ03OyKsQE/Pz/RGzk5OYWFhZIk+fr62tvbZ2ZmNjU1iTo5OTnKU7527VpISIi3t/c999xzszG31tbWgYGBytbc3Nza2trTp08XFxdfuXKloaGhS5cuPj4+Ij2KPXfp0sXJySkzM1NZ2CM3Nzc9PV0dydTEiOLS0tLs7Oz6+vq8vLy0tLTAwEB1NLW0tBR3jk1LS1PvJy8vr7S0NCAg4BYp0cfHx9XVNTMzU92wvr4+PT1dHWksLCwCAwOtra29vLzUeysoKDh16lRgYKC3t7foXmV5Em9v7379+olM1dDQkJmZqR6Dqs6HP/30U21trfISiAdeXl5iqRI/Pz9zc/NevXqpVy5R6nh6emZmZtbU1JiZmQUEBNTU1DQ3Nxt/HXPvvfeqh/g2NzefPXtW/X1HTU2NOHMnJyc7Ozvj8+zUqZN4gkVFRdnZ2eJBWlpa586dw8LCWlpafvrpJ2tr627duqlbFRcXl5SUZGRkdO7cWYz79fDwGDhwoOhbrVYbEBCg7hZLS8uCgoJjx441NDR4eXnZ2NgY/A56eHiIvHf9+nWDTVeuXGltbT1//ry1tbWpqan4JdJoNIGBgY6Ojm1tbZmZmWLga1FR0dWrV9VJOygoqLm5WdmhCMCtra1KiUajCQgI6HC0LQCQLQHgv2/u3Ll2dnZz5sxpbm7u06fPunXrFi5cWFVVFR8fb2FhYWFhYWZmNnfu3Pb2dvFArHf33HPP7dq161//+pe4CiT07t07Pj7e2tra3Nz81pMJFevXrxcr8kmS9MADD8THx8+ePfvxxx9X11m4cGF+fn58fLyDg4OYuXeLHW7YsGH79u3qklWrVj3xxBMdVv7oo48++eQTkR5DQkLi4+MNPmQLmZmZc+bM0Wg0AwYMiI+P37RpkzI2r7m5ubKycvPmzeIMlSZPPPGEGB+7dOnSLVu2zJ0719TUtG/fvvHx8U888URLS4vxKpcdevzxxx955BFJkpYtWyZW7ZsyZcrAgQPnzJkjoqYkSQkJCcoqlIGBgatWrfL09FSuZHaYV999911lzZJVq1atX79+/vz5pqam4rruggULnnnmGUmS1q5dK9ZvXLhw4YgRI+bPn3/27FnRKjExcdeuXeJisrGCgoIXXnhBXEwrLy/fsWNHbm5ufHx8jx49lDre3t5vvfXW0aNHX3zxRfV+du7cuWvXrvj4eOOVGBXjxo0bP378nDlzMjMz1YnopZdeeuGFF8aNG6ckq9WrV/fs2dPU1FTdG19++WV2dnZ8fPwjjzwilkW1sbER1/HGjBmzZMkSUVmv18fExISFhSkLVCr0ev3ixYuV3lBC5ujRo5csWSJ2aG1tvWLFCoMLa5IkjRo1aubMmXPmzElPT3d2dl6+fHlaWpqyoqPCyclp2bJlOp1OuQBeUVHx6quvqr+VcHZ2XrlyZWhoqEajcXJyUpaKVURERIilTT7++GNxYvv37798+fLKlSv79u1bWlo6Z86cHj16rFy5Ut3qk08++fe//718+fLi4uLVq1dLkjRy5MiBAwc6OjqePn3axsbm3//+t/oLoKqqqpiYmFOnTtna2q5cubKoqMhg2c/JkycvXrxYkqRDhw6lp6erN9XX1zc2Nq5evVpcuRW/RBYWFi+99NKwYcNqa2vnzJnj5ua2YsWKmJgY9Wxbc3Pzl156aefOncqxxNonGo1Gmadqbm6+bt06sVAtAJAtAeB/nbgcJ+Z2Wlpaenp6WllZNTU1eXp6KiM8leF/jo6O4rGoY3AXHwsLC09PT/WClj+rsrJSSadlZWWyLCuHUFhbW4s9G5R3qKqqSgwyVCgfzTusrFyBNDc379SpU4cn39zcfP36dUmSSktLxSBGpZWyH7FJKXFwcBDXLW1sbJqbm8XV3S5durS3t3d4Hexm7O3txcUiW1tbpcTNzU198ba6uloZhOzp6eni4iIOfTNmZmYeHh5KHVtb25aWFvX1Zzs7O7FVlmXxTGtra1taWvR6vRKiampqampqbnaI1tZWvV6v/FhTU6PX6w0Gbep0OrFYqLrmzSobsLOzc3d3Nxgy2tbWVlJSoj4rrVbr5uZm3Bu1tbU3btxoaWmxtbVVOlZkS1tbW+UONGKHxgO8lU0GbwPRXH04Nzc347Y2NjYeHh4iIorR1B0OH1UGWitv4Pb2doOBrO3t7fb29rd4uW1sbMRbWnnX1dXV6fV68RLrdDqR6Az24ODgIMtyWVmZ8quk7EeSJI1GY/Aes7S0rK2tLSoqcnBwsLW1NTMzM+gZ5XdcPSRbTYzAt7W1FVfjlUPU1NRYWFhYW1t36tSprq5O/U2WqGNubm78KigDpy0sLNSD5AHgzsIaJAAAAAAAsiUAAAAA4I/GmFgAd57ExMTevXu/8sorJiYmLS0tr732Wrdu3UxMTJYtW2Zc+dFHH+3bt694IMvy9u3b1Td4vHTp0quvvqrT6e65555JkyapZ5pdvnz51Vdf7dy5s5jZtXPnzrS0tA7P5/PPPz916pS6xMvLa+jQoWIC55UrV7Zv356ammpwf46xY8cOGDBAkqQvv/yytLR08uTJVlZWV69e3b59+1dffaXcgSYvL+9mQ2Szs7Nff/115WYzrq6us2bNMhgim5OTs3LlSicnJ2V+Wm5ubkJCgjJS1NioUaMaGxsTEhJqamry8vJWr149ceJEg5sVSZKUn5//xhtvuLi4KHtubW2Nj4+PiIgYMmSIJEkPPvigeMq1tbUffPCBuL+rl5fX5MmT1UOFW1tbP/zwQ+V2LxEREQ888ID6QOHh4Y899ph68mF4eHhNTc327dvVkx6LiooSEhJ0Op04n8bGxqSkpCeeeMJ4AdLBgwcblAwfPlxZYPD69evbt2+/9957J0yYoB4gOnz4cC8vL1Hi5uY2adIkd3d3Z2dnd3f3YcOGmZqabt++XRljPGzYMLFm6dChQ8XcuUGDBrm6uj777LOfffaZmIP397//PTQ0dPv27YcPH5Zl+dFHH50wYUJbW1tSUtJnn33m7Ow8efJkT09PZ2fn6OhovV7v4OCgLLaplpKSsmjRIvFYo9E88sgj999/v6OjY1RU1PXr19vb27/66qvPP//cxMRELOOxb98+0QkDBw5MSEg4evSoaD548OCHHnqow7fEsWPHmpqalPekJElhYWENDQ179+4tLy8fPXr0zd5Ltra2kyZNKiws/Prrr0VJTU3NunXrKisrH374YXXN77//XnkWgk6ni4mJSUhIUJYnlSTJ2tp61qxZWVlZK1asmDRpkvFk45MnT4r9DBgwQMz7lSSpvr5+48aNBw4csLS0nDx5sr+/v6Wl5fTp04cPH97eJqk1TQAAGVRJREFU3p6SkpKWlmZhYTFp0qTu3buLJs3NzW+++ebgwYNtbGy++OILSZL69esnFupQMzMz6969e2FhYVNT06ZNm44ePdrc3Hz58uXCwsLXX3994MCBVlZWO3fuNGil0+kmTZqkzM5NT0/fsWOHeNzS0rJ58+YTJ05otdrJkyeLe0cBwB2DZVgA3InrWz788MMNDQ2yLH/11Vfm5uaffPLJrl27OrwZz6ZNm5Tme/bsUd/2U+3BBx80WN9S2LBhg2g7ffp041b/+Mc/Kisrjde3XLdunXLQ/fv3i5ljw4cPLysrU9a3XLt2rajw1FNPDRs2rLS0VJblgwcPdniLyLi4OFF57ty5N+vSNWvWiDrR0dEGm9577z3lfI4ePSqm591///2FhYXPPvusqPPOO+8odb777jt1jPnPf/5j8Fori0a+/fbbSuH333/v4+Pz1ltvGVResGCBsqv+/furF7GUZTk1NVW5SY8kSatXrzZY33LVqlXGb7a0tDR1rnj99dfT09P9/f1XrFghKsTExPTq1evSpUsdvlcN1rd87bXXlE3nzp0LCAh49dVXb/Y+X7p0aVBQ0Pnz59WFFy5c6Nmzp7LDJUuWiPUtlyxZYtBc+QZk8eLFmZmZ9957ryRJ3bt3P3PmjCzLykKXyvqWt6Csb6nw8/M7deqUuk52dna/fv0kSfL19U1NTX3jjTdEzQULFuTk5PTv319pq17W0mB9S/UhvL29T5w4IctyQUHBfffdN3/+fONWyvqWnTp1Onbs2LvvvmvwhnzmmWdETWV9S2MiG4vvKVxdXUUCF2JjY11cXA4dOqSUxMXFGTSfM2eO2KRe39LR0fHbb79Vn2p5efmIESMkSXJwcNi/f79Svn79ent7++TkZHE/KkmSZsyYcbMXwmB9SyUGG6xvKSp//PHHVlZWe/bsUZpv2rTJuLmFhcWuXbtY3xLAnYUxsQAAAACA34sxsQD+irp37x4ZGam+aWf37t0N1m/09/ePjIwMDQ0VP44ZM0asoKjYtWtXVlbWqlWrvLy8Hn/88aSkJGX9xt27dyu3gpRled68eXv27DE4hz179lhaWkZGRo4ePfr06dPvv/++iYmJuOr49ddfnz59usMzf+ihh8StOPfu3avX6yMjI5UFTv72t78p1Tp37hwZGalcgFVfeurcufMLL7ygjMFT7Nu3T7mnpSzLYj2SgoKCpKSkW/RkcnKycptTcXVXXLASrl27lpSUZG1tvXTpUlHi5eUlLhDl5uZGRkYqg2NHjBhx//33S5Ik/jVQVFSUlJRUUVHh4eERGRlpfGn34MGDTU1NU6ZMUca7Dhs2zMfHR13z4MGDly9fjoyMdHFxMWh++PBhZTirLMsTJkx44IEHbty4kZSUFBwc/Pe//13UURbMmDt3rnqx+yNHjiQlJYmbx7q4uERGRg4dOlRsSklJefXVV9XHMl51Q5KksrKy+Ph4Dw8PWZYfeeQRZ2fnM2fOxMfHK4uXhoWFhYaGJiUlidv/ihLjhSgrKirWr1+/Z88eBweHyMjIW999Vxg0aJAyavdX/RLZ2dnNmDFDOcT333+fnJws3mziYqwkSTU1NR999FFRUZGNjU1kZGTnzp1ra2tv/Y5Ss7a2njZtmrW1dUpKyqZNm44cOWJlZRUZGSlJUl1d3aZNm1JSUkRJ//79xXvs9OnTyvhbYw0NDZs3b25oaFBG5FpYWEydOvX++++3sLDo2rXr6dOnxa+qLMsvv/xyt27dnJ2dlXeveClDQ0PDw8OTkpKuXr1qZmYmzueXaG5uTkpK+vLLL5ubm7dt23bq1CmtVhsZGdmrV6+YmJikpKQrV67wnzMAsiUA3HnZMiYm5tbLTvr7+y9atEhZ72Hs2LFjx45VV7h27drGjRvfeOON9evXDxo0aPfu3Uq23LNnjxImR4wYkZiYWFxcrF5FXZKkr7/+uqGhYfTo0aNHj7a0tHzsscfKy8uHDh2amJh448aNm2XLUaNGjRo1SpKkkpKSCxcuvPjiix0uGtGlS5cFCxYoS1MYbyooKDCYPpqcnCyygYgZiYmJXl5eJ06cUAo79O2333777bdKgk1MTOzcubOytbCw8N13342Ojn7xxRfVrQ4cOHD48OGRI0eqs6UyCNZYcXHx+++/n52dHRoaOmLECONseejQofLy8sTERGW+nHoKpRIgd+/ePWzYMONseeTIkSNHjojHwcHBiYmJgYGB58+f/+CDDyZMmCCyZUpKymuvvSZJ0tKlS6Oiogzi4gcffCAeu7i4PP300yEhIT/99JMkSUePHj169OjPviHLy8vXrVsn3pmJiYk6ne7QoUPKaExJkhYtWuTr67t+/fozZ86Ikpdfftl4MHZlZeWHH34oSZKfn19YWNgvzJYG6fdXZUvlxx9++EH0z7x585RsWVtb+/HHH0uS1KlTp+nTp4eFhRUXF588efIXHsLGxubJJ5+sq6v75ptvxLKurq6u4jsUkRJFh/fv33/o0KFifO/atWtvkS0bGxu3bNliaWmpZEtLS0v1WrLr168Xz2LmzJmiJyVJEhO2N2zYIL5wmTFjxtChQ7dt25acnGxra2swLPkWWlpaEhIS9u7dK0mSWNLW0tKyd+/eo0eP7tGjx9mzZ8mWAO50jIkFAAAAAJAtAQAAAAB/NMbEArgj1dXV5eTkmJubX79+XVm+QrCysnJzcystLRXLbOj1+uzsbLFJLMng4uLi7u4ubmlbX19/48YNWZZFK43m/33j5uLi4uHhYXDb2/r6er1er0zMMzc3FxPeGhsbKysrfXx8lHUySktLlVmIDQ0Nubm5ZmZmHh4eyv4lSXJ2dhYlJSUlxcXFbW1tBpvEsSwsLNzc3JShueo6Dg4O165dU68mIiqrqzU0NOj1evXOhaqqqsbGxry8PK1WK55FWVlZdXW12Co2NTU1lZWVeXp6tra2Kn1obm7u7u6u7MfJycne3l6SJGU5kLKysqqqKvG4sLCwtbW1rKxMaS5oNBpPT0+tVitJkpmZmY+PT1tbW2FhoZubm3oSrJmZmZubm9gkVo5pamoqKCjQaDRKiahTU1MjNrm4uCjjbJuamvR6vY2NjShxdHT08vJS71+SJJ1O5+7uXltbq8w1bW5uLigo8PDw0Ol03t7e4larYpOXl5der6+oqCgoKHB3d1cm6Do4OChTH729vdWHcHBwEEevrKwUq7AoxH6ampqUOpIkubu76/X68vJyrVarPoRSwd7eXrzNjEskSWptbb1x40Zzc3NLS0thYaGTk5M4hL29vY+Pj8GMYq1W6+npqdFoxBO0t7fv8B7Fgqmpqbu7u7m5uYeHh1iqRxxLGQdeVlamvLXEoZU+Ud4Pt2BnZ+fg4KDX6xsbG5VWeXl5Bu/ntra2oqKi5ubmzp07i8qiRHmNmpqaxHE7fC4ajcbNzc14UHR1dXVpaakkSSUlJUqJ2Ketra0yt9bExMTd3d24uZqJiYl40zY0NKjLa2pqcnJy6uvr1YXt7e3Xr1/X6/W2trbu7u5+fn6yLOv1eo1G4+3tfbObWgMA2RIA/pvS09OnTp2q0WgqKyvV61VKktSnT5+VK1euXr1azGtau3atcu+QysrK5ubmp59+esqUKeLz8ZkzZ2JiYhoaGgYNGrRy5Urlw9xTTz01depUS0tL9Z7Pnj27aNEi5dPh5MmT//Wvf0mSlJCQcOrUqTVr1ijNV65c+dVXX4nHGRkZM2fOnDJlSlRUlHp1k5kzZ06bNs3W1vatt9765JNP1BFx5syZnp6eMTExVVVVQUFBK1eu7N27t0EPTJ8+/fjx4wsWLFA3DA0NVVabFDIzMxctWqReB1LIz8+vq6ubO3fuxIkTP/30U0mS/vOf/3z22Wdi6+XLl+fOnWtmZubn57d8+fJDhw5NnDhRbAoODl61apWyn8cff3zKlCmSJL333ntiQunWrVu3bdumfAVQWlqakJBw6NAh9dHHjh27cuVKERu6deu2Zs2azz77bNGiReLGSEo1Pz+/lStXpqWlLVq0SNwpJzc3d/78+ebm5uJLAUmSunTpsmrVqt27dyclJc2fP3/+/PnKajF5eXmLFi0aNWqUKJkwYUJ4eLhydxxBrF+anJysrBVRUFCwYMGCZ555ZsqUKW+//fbOnTvFc3/ooYfefvvtmJiYHTt2XL9+fdWqVV27dhVNHn300fvuu0+J9+oZp+PHj3/qqackSdq4caN6/qQkSV988cWxY8fy8/MnTpw4Z84cUajX69euXXvq1CkPD4+VK1cqC6V06tRJpLixY8eK2Z6dOnVqbm6WJGnMmDHKqjOFhYUxMTGZmZl6vV7MKG5qarp69er48eMXLFhgsBqkq6vr66+//tVXX4knOGXKlHnz5t3sN87Z2XnZsmUhISFmZmb+/v4iTL7yyisZGRnKFzfiwTfffHPt2rXp06crh/v000/Fe+wWwsPDn3zyyZiYmB9//FGU7N+/v6SkxOD9XF1dvXz58oceemj9+vUxMTHp6ek1NTXLly+3s7MTFcLCwsSxOpyHbG1tvXjxYjFjWe3gwYPiXa1ky8OHD4tuGTt27OLFi5XvrRYtWmSwMqcBCwuLl19+ubS01GDllZSUlGnTpmVlZakLxSqa165dW7JkyUsvvfTUU081NTXFxMTY2touW7bMePVOACBbAsB/X2VlpcGtaBQODg79+vVTri3k5OTk5OSoK3Tt2lX5yF5VVZWWllZXV+fi4qJckDSoo6iqqhKfZcWPs2fPFrcV+fDDD69fv967d2+xjqXB59rq6ur09PTZs2crS6ULvr6+oiQvL+/SpUvGm8RlPTs7uz59+qjvSqrUyc3NPX/+vPJpWJIkS0vL1tZWdbWampoff/xRxDBjP/7447Rp08SzUN/4p7a29uzZs5IkabXanj177tu379SpU2KTqampiDRKNlOai2xZUFCgVFbSWkFBgbrk0UcfVVaDtLGx6dWrV0JCwsWLF5WLYEoS6NWrV2pq6sWLF0VJfX39uXPnDOrce++9aWlp9fX1GRkZxcXFyiZRotzp19vb29vb26AHrKys7r333vPnzyslDQ0NGRkZRUVFYtPOnTvF03nooYdCQkIsLS1zcnLOnz+vvirl5eV1s7vmeHl5if4xviVScXGxOFtPT0/lHr+XL1/OyckpLCz09/cPDg5WTl6SJBFL1JVFh6tLsrOzxR2qmpublU4TQVQsm6lmbm7es2fPvXv3iicoVpK8GTMzs6CgIPW9iFtaWn766SeD11qSpBs3bpiamipvDEmSvv/++5/9jXZ3dw8NDVVfn9fr9WfOnFF+3YTW1tbMzMxhw4b16dNH5MnW1lb1r0/fvn3VJ2n4oUerDQgIML6/bklJicETKSkpEb9Z6n4zNTW95557/Pz8lCv8xkQdJesqSktLxaVRNVmWr1y5kpOTY2pq2qNHD/H2E9exxaqkAHBnYb4lAAAAAIBsCQAAAAD4ozEmFsCdzdfXNyIioqCgoKioaObMmbIsBwcHm5qaGtccNmyYpaVlcnLywYMHlTmKFy5cMJiu+bOGDh0aFBQkSdL169djY2PFTsrLyz/88ENLS0sfH5+IiAjjVocPH3Z3dzfYVFBQkJycfP78eS8vr4iICAsLix49elhYWKjrFBYWbty4cdSoUSEhIQb79PT0nD59+t69e8Wct8GDB48bN07MES0qKvroo4/s7OyysrLEBNFOnTqFh4dbW1sXFRUlJyf36dPHzc1t3759x44dE91la2srJvIdO3ZMGXdaXFy8adMmZQqcsePHj4uZq1ZWVmFhYTt37lQWYFQMGjRIGdt548aN5OTkEydOJCYmRkRE2NnZiRJzc/PIyEiDkYR6vX7Lli1paWmurq7h4eH29vYlJSX79u0zHpE4cODAxx57zGDcqYuLy5QpU1pbW8XLNGDAALEEolpZWdm2bdtOnz7t5OQUERGh3CBHlmXRKjU11aBJ//79x4wZo9w+x0B5eXlycnLXrl3Fczl16pTYz8mTJx0cHCIiIrKzs8U++/btO3DgQHFiFRUVycnJpaWlzc3Nw4cPt7CwuHr16meffXb8+HGx2759+/r7+z/22GOBgYEGR0xLS9u8eXNERISbm5udnV1kZKTYrVBdXb1v37709PTNmzeHh4cbn3BoaKh43a2srD755JPw8HDjZVF79+49atSoDpdLVfTq1SssLOz/fbbQao8fP668E6qqqqZNm2Yw09XAuXPnPv300wEDBihrY4r3pKenpzKlU5IkCwuLiIiIIUOGWFhYPPLII8rI6oyMjNTU1PDw8AceeEApOXnypHjK5ubmERER3t7eGo0mLS3N1NR06NCholpjY2NycvLhw4fFj0FBQWLThQsXxJKnFy5cEK9gZWXlrFmzfHx8JEnS6XQPP/ywv7+/ubl5586dCwsLdTpdeHh4ly5dTExMzp4929raOnv27C5dunQ4HF2r1YaHh/v6+oof//a3v7W0tCQnJ+fm5ra0tOTk5Ny4cUMc9J577hk5ciT/zwO4Y8gA8F+SlJRkcGPVWxg3blxLS4ssy59//rlWq922bZt4sHXrVrG3yZMnjx07tqmpSX2IL7/80uBelw8//HBDQ8PUqVNHjx5dX1+v1FSvhy58/PHHe/bsudmtFx988MGamhpZlvfu3WtjY7Nx40bjJ/jNN9/Y2tp++OGH4kf1wvGKkSNHVlRUiDXWDQwfPrysrGz27Nnix7Vr1x44cEBElGHDhpWWlqqPdfDgQfWNLuPi4m7W7SIYSJK0Zs0aUaLc2UUtLCysqKhIluWjR496eHi8++67x44dU3/cf+edd0TzW9zQRaS4/Pz85557zqD87bff/v7778UnbwNvvvmmcrYnT57s0qWLJEn9+vXLzs6WZTk1NdXX13f16tUGz+ull15S9tCnT5+srCxZltPS0gxucNK7d+/Lly/Lspyenu7v779ixQqD/Sg3Ylm+fLlSePbsWYP5tMHBwRcvXlQqvPLKKwbPYunSpefPnw8KClq6dOktfgsuXrwYHBy8ZMkS8UC9h3vuuefs2bPLli0TPy5evFhpdenSJTGvr3v37mfOnFmxYoXB0RctWmR8rKysrD59+kiS1LVr19OnT3d4PtnZ2WLmnq+vb2pq6htvvCF2uGDBAoOab731VufOnX/44Qd1YV5e3oABA55//nnjPRcUFCh3MJIkaf78+cqma9euDRo0SNn07LPPKpuKiorCwsKeeeYZ8eN7772nVHN3d09JSTE+0Jo1a5Q6rq6uhw8fNq4TFxfn7Ox88OBBpeSDDz5wcnI6cODA2rVrxQNZlsvKyoYPHz579mylWnl5+YgRI5T9z5o1S5Qb3HhJkqQZM2bc7EXfsGGDjY3N3r17ZVmurq6OiIh48sknxSblHlFqVlZWe/bsUe+hrq7O+A5DkiRNnTpVVNi8efMv+X9Vp9N98cUXW7du1Wq1n3/+ufoQLS0t48aNmzhxovgxISFBo9Hs2LFDluXW1tbx48dLkmRiYpKUlMTfMgC/GWNiAQD4v+3dSUsDWRQG0AoxBpWoxBiDsyYOiWOCgogSBBcqKuJEVIJi/EW96H/pUsFdLx5dFImCTfem4ZxVqPeoUKWIH+9yLwDwb6mJBf4zCwsLoSr1N5vr9Xo45Jybm+t0OuVyOZPJhA9hw9HR0dfXV3IgZNj8+vqabIW6tbWVTqebzebn52eyFLbZbHadcC4tLeVyuZeXl2Sb09j6+nroyzo9Pf38/Bx6NnYJS/F51+HhYe85ba1W6+/vPzg46H0P1Wo1m80eHByEhrTVarVYLLbb7Y+Pj9XV1VBZGpucnGy323Htbm8lZGx/fz+0Vw2VuuFKPCQwVqlUQrlsqVR6enpaW1ubmJh4fHyMZw/Gh2x7e3sfHx8/fd3i4uLQ0NDe3t7b21vy+sbGRrFYfHh46J13kqxyHB8fb7Va7+/v8/PzoSlooVBotVrJPcHu7m78FbOzs2Hz2NjY/f19sjXuzMxMqD4NS73DWnZ2dsJ9kkv5fP7u7i4emxFF0dTUVNzmN4qiRqPR9YCNRmN0dPT29jYcFf5kdHT05uamXq+HD8ny1FKplM/n6/V6uHOyEejIyMj19fXu7u7ExEQ+n9/e3u769m+7huZyuaurq9BG+Kehi2HP9vZ2oVAoFAqbm5vhzr3NVDc2NlqtVldH4qGhocvLyzB0pEtYiqtSk086ODh4cXER/0ImjzcHBgbOz8/jMS1ra2vxkw4PD39bdlur1eI9uVzu29raarXabrcnJyd7r/T19cVL2Wz27Ows+Yz9/f2np6dxeWpc1ruystL1I4iXeq2srDw/P4cuxJlM5uTkJAx9jaJoeXm56z7R3zNdk1fS6XTvgJzkW61UKr336ZVOp+fm5r6+vjqdTigQiKVSqePj4/BXLoqicrnc6XTCg4elfD6fSqV6m+gC/F7ql/8FAgAAwE/UxAIAACBbAgAAIFsCAAAgWwIAACBbAgAAgGwJAACAbAkAAIBsCQAAgGwJAAAAsiUAAACyJQAAALIlAAAAsiUAAADIlgAAAMiWAAAAyJYAAADIlgAAACBbAgAAIFsCAAAgWwIAACBbAgAAgGwJAACAbAkAAIBsCQAAgGwJAAAAsiUAAACyJQAAAP/rbPnHn7OpVCqV8koAAAD4h/4Cc1EfkLMggA4AAAAASUVORK5CYII=" />
          <div class="t m0 x1 h2 y1 ff1 fs0 fc0 sc0 ls1 wsc">Form I-90 02/27/17 N</div>
          <div class="t m0 x1 h3 yda ff2 fs1 fc0 sc0 ls1 wsc">1.b. <span class="_ _15"> </span><span class="ff1 v4">I am blind or have low vision and request the </span></div>
          <div class="t m0 xe h8 ydb ff1 fs1 fc0 sc0 ls1 wsc">following accommodation:</div>
          <div class="t m0 x15 h2 y1 ff1 fs0 fc0 sc0 ls1 wsc">Page 4 of 7</div>
          <div class="t m0 x1 h3 ydc ff2 fs1 fc0 sc0 ls1 wsc">1.c. <span class="_ _16"> </span><span class="ff1 v4">I have another type of disability and/or impairment </span></div>
          <div class="t m0 xe h8 ydd ff1 fs1 fc0 sc0 ls1 wsc">(Describe the nature of your disability and/or </div>
          <div class="t m0 xe h8 yde ff1 fs1 fc0 sc0 ls1 wsc">impairment and the accommodation you are </div>
          <div class="t m0 xe h8 ydf ff1 fs1 fc0 sc0 ls1 wsc">requesting): </div>
          <div class="t m0 x1c h7 ye0 ff2 fs5 fc0 sc0 ls1 wsc">Part 5. Applicant&apos;s Statement, Contact </div>
          <div class="t m0 x1c h7 ye1 ff2 fs5 fc0 sc0 ls1 wsc">Information, Certification, and Signature </div>
          <div class="t m0 x1 h3 ye2 ff2 fs1 fc0 sc0 ls1" style="bottom: 355px; left: -65px;">
            NOTE:<span class="ff1 wsc">  Select the box for either </span><span class="wsc">Item Number 1.a. <span class="ff1">or</span> 1.b.<span class="ff1">  If </span></span>
          </div>
          <div class="t m0 x1 h3 ye3 ff1 fs1 fc0 sc0 ls1 wsc">applicable, select the box for <span class="ff2">Item Number 2.</span></div>
          <div class="t m0 x1 h3 ye4 ff2 fs1 fc0 sc0 ls1 wsc">1.a. <span class="_ _14"> </span><span class="ff1 v7">I can read and understand English, and I have read </span></div>
          <div class="t m0 xe h8 ye5 ff1 fs1 fc0 sc0 ls1 wsc">and understand every question and instruction on this </div>
          <div class="t m0 xe h8 ye6 ff1 fs1 fc0 sc0 ls1 wsc">application and my answer to every question<span class="ff6">.</span></div>
          <div class="t m0 x1 h3 ye7 ff2 fs1 fc0 sc0 ls1">NOTE:<span class="ff1 wsc">  Read the </span><span class="ws1c">Penalties</span><span class="ff1 wsc"> section of the Form I-90 </span></div>
          <div class="t m0 x1 h8 ye8 ff1 fs1 fc0 sc0 ls1 wsc">Instructions before completing this part. </div>
          <div class="t m0 x1 h9 ye9 ff4 fs5 fc0 sc0 ls1 wsc"> Applicant&apos;s Statement</div>
          <div class="t m0 x1 h3 yea ff2 fs1 fc0 sc0 ls1 ws10" style="left: -65px; bottom: 276px;">
            1.b.<span class="_"> </span><span class="ff1 wsc v8">The interpreter named in <span class="ff2">Part 6<span class="ff7">.</span></span> read to me every </span>
          </div>
          <div class="t m0 xe h8 yeb ff1 fs1 fc0 sc0 ls1 wsc">question and instruction on this application and my </div>
          <div class="t m0 xe h8 yec ff1 fs1 fc0 sc0 ls1 wsc">answer to every question in</div>
          <div class="t m0 xe h8 yed ff1 fs1 fc0 sc0 ls1 wsc">a language in which I am fluent and I understood </div>
          <div class="t m0 xe h8 yee ff1 fs1 fc0 sc0 ls1">everything.</div>
          <div class="t m0 x24 h8 yef ff1 fs1 fc0 sc0 ls1">,</div>
          <div class="t m0 x1 h12 yf0 ff2 fs1 fc0 sc0 ls1 ws25" style="left: -64px; bottom: 179px;">
            2.<span class="_"> </span><span class="ff1 wsc v0">At my request, the preparer named in <span class="ff2">Part 7<span class="ff7">.</span></span>, </span>
          </div>
          <div class="t m0 xe h8 yf1 ff1 fs1 fc0 sc0 ls1 wsc">prepared this application for me based only upon </div>
          <div class="t m0 xe h8 yf2 ff1 fs1 fc0 sc0 ls1 wsc">information I provided or authorized.</div>
          <div class="t m0 x24 h8 yf3 ff1 fs1 fc0 sc0 ls1">,</div>
          <div class="t m0 x10 h9 y49 ff4 fs5 fc0 sc0 ls1 wsc"> Applicant&apos;s Contact Information</div>
          <div class="t m0 xf h3 yf4 ff1 fs1 fc0 sc0 ls1 wsc">Applicant&apos;s Daytime Telephone Number<span class="_ _7"></span><span class="ff2">3.</span></div>
          <div class="t m0 xf h3 yf5 ff1 fs1 fc0 sc0 ls1 wsc">Applicant&apos;s Email Address (if any)<span class="_ _17"></span><span class="ff2">5.</span></div>
          <div class="t m0 xf h3 yf6 ff1 fs1 fc0 sc0 ls1 wsc">Applicant&apos;s Mobile Telephone Number (if any)<span class="_ _18"></span><span class="ff2">4.</span></div>
          <div class="t m0 x1c h7 yf7 ff2 fs5 fc0 sc0 ls1 wsc">Part 4. Accommodations for Individuals with </div>
          <div class="t m0 x1c h7 yf8 ff2 fs5 fc0 sc0 ls1 wsc">Disabilities and/or Impairments <span class="ff1">(continued)</span></div>
          <div class="t m0 x10 h9 yf9 ff4 fs5 fc0 sc0 ls1 wsc"> Applicant&apos;s Certification</div>
          <div class="t m0 x10 h8 yfa ff1 fs1 fc0 sc0 ls1 wsc">Copies of any documents I have submitted are exact </div>
          <div class="t m0 x10 h8 yfb ff1 fs1 fc0 sc0 ls1 wsc">photocopies of unaltered, original documents, and I understand </div>
          <div class="t m0 x10 h8 yfc ff1 fs1 fc0 sc0 ls1 wsc">that USCIS may require that I submit original documents to </div>
          <div class="t m0 x10 h8 yfd ff1 fs1 fc0 sc0 ls1 wsc">USCIS at a later date. Furthermore, I authorize the release of </div>
          <div class="t m0 x10 h8 yfe ff1 fs1 fc0 sc0 ls1 wsc">any information from any of my records that USCIS may need </div>
          <div class="t m0 x10 h8 yff ff1 fs1 fc0 sc0 ls1 wsc">to determine my eligibility for the immigration benefit I seek.</div>
          <div class="t m0 x10 h8 y100 ff1 fs1 fc0 sc0 ls1 wsc">I certify, under penalty of perjury, that I provided or authorized </div>
          <div class="t m0 x10 h8 y101 ff1 fs1 fc0 sc0 ls1 wsc">all of the information in my application, I understand all of the </div>
          <div class="t m0 x10 h8 y102 ff1 fs1 fc0 sc0 ls1 wsc">information contained in, and submitted with, my application, </div>
          <div class="t m0 x10 h8 y103 ff1 fs1 fc0 sc0 ls1 wsc">and that all of this information is complete, true, and correct.</div>
          <div class="t m0 x10 h8 y104 ff1 fs1 fc0 sc0 ls1 wsc">I further authorize release of information contained in this </div>
          <div class="t m0 x10 h8 y105 ff1 fs1 fc0 sc0 ls1 wsc">application, in supporting documents, and in my USCIS records </div>
          <div class="t m0 x10 h8 y106 ff1 fs1 fc0 sc0 ls1 wsc">to other entities and persons where necessary for the </div>
          <div class="t m0 x10 h8 y107 ff1 fs1 fc0 sc0 ls1 wsc">administration and enforcement of U.S. immigration laws.</div>
          <div class="t m0 x10 h8 y108 ff1 fs1 fc0 sc0 ls1 wsc">I understand that USCIS will require me to appear for an </div>
          <div class="t m0 x10 h8 y109 ff1 fs1 fc0 sc0 ls1 wsc">appointment to take my biometrics (fingerprints, photograph, </div>
          <div class="t m0 x10 h8 y10a ff1 fs1 fc0 sc0 ls1 wsc">and/or signature) and, at that time, I will be required to sign an </div>
          <div class="t m0 x10 h8 y10b ff1 fs1 fc0 sc0 ls1 wsc">oath reaffirming that:</div>
          <div class="t m0 x25 h8 y10c ff1 fs1 fc0 sc0 ls1 wsc">1) I reviewed and provided or authorized all of the </div>
          <div class="t m0 x25 h8 y10d ff1 fs1 fc0 sc0 ls1 wsc">information in my application; </div>
          <div class="t m0 x25 h8 y10e ff1 fs1 fc0 sc0 ls1 wsc">2) I understood all of the information contained in, and </div>
          <div class="t m0 x25 h8 y10f ff1 fs1 fc0 sc0 ls1 wsc">submitted with, my application; and </div>
          <div class="t m0 x25 h8 y110 ff1 fs1 fc0 sc0 ls1 wsc">3) All of this information was complete, true, and correct </div>
          <div class="t m0 x25 h8 y111 ff1 fs1 fc0 sc0 ls1 wsc">at the time of filing.</div>
          <div class="t m0 x26 h3 y112 ff1 fs1 fc0 sc0 ls1 wsc">(mm/dd/yyyy)<span class="_ _19"></span>Date of Signature<span class="_ _1a"></span><span class="ff2">6.b.</span></div>
          <div class="t m0 xf h3 y113 ff1 fs1 fc0 sc0 ls1 wsc">Applicant&apos;s Signature (sign in ink)<span class="_ _1b"></span><span class="ff2">6.a.</span></div>
          <div class="t m0 x10 h9 y114 ff4 fs5 fc0 sc0 ls1 wsc"> Applicant&apos;s Signature</div>
          <div class="t m0 x10 h3 y115 ff2 fs1 fc0 sc0 ls1 wsc">NOTE TO ALL APPLICANTS: <span class="ff1"> If you do not completely fill </span></div>
          <div class="t m0 x10 h8 y116 ff1 fs1 fc0 sc0 ls1 wsc">out this application or fail to submit required documents listed </div>
          <div class="t m0 x10 h8 y117 ff1 fs1 fc0 sc0 ls1 wsc">in the Instructions, USCIS may deny your application.</div>
        </div>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 21px; left: 345px;">@ApplicantInformation.DaytimePhoneNo </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 57px; left: 345px;">@ApplicantInformation.MobileNo </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 93px; left: 345px;">@ApplicantInformation.Email </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" bottom: 125px; left: 345px;">@ApplicantInformation.ApplicantSignature </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" bottom: 100px; left: 494px;">@ApplicantInformation.SignatureDate </p>
        <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
      </div>
      <div id="pf5" class="pf w0 h0" data-page-no="5">
        <div class="pc pc5 w0 h0">
          <img class="bi x0 y0 w1 h1" alt="" src="data:image/png;base64,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nFxYWLht27bYkoKCgn79+u3Zs2fq1KkdOnS44oorwk179uwpKirKzMyMSr7KwoULf/e734WPk5KSCgoKKisrf//73xcWFlZWVs6cOTMIglNPPfWqq6466O7vvPPOI488Ej5OTEwsLCw87rjjmtR59913Z8yY8fWf6hISCgoK9u/f/+ijjxYUFAwYMCDa1NDQUFRUlJCQcO211wZB8N57782YMaOgoGDgwIEHDhyYOnXqhx9+GBcXV1BQcOKJJ/rvDPgrNQL8ncydOzcuLu4v/ONz/vnn19XVNTY2zps3LyEh4emnnw4fPPXUU+HRRo8efd555+3fvz/2KV544YWWLVse9IDDhg3bu3dvY2Pj/Pnzk5KSHn/88Zdeeql169aPP/54uO/YsWO/6mQee+yx6ClefvnllJSUaNPMmTPD8iuuuGLo0KGVlZVXXnlltPX73//+rl27xo8f3/yYZ511Vnl5efNWuvrqq8MK06ZNa771jTfeaN++fRAEZ5xxRllZWeymBQsWZGZmRsefOnVqWF5QUBCW/OY3vwlLCgsLTz311NLS0sbGxoULF3bq1CkIgiFDhpSUlERHu+6665qc8L/927+Fm66//vqo8KSTTtq0aVPz87zhhhsGDx5cXFx84403NjnO/fffH9b5+c9/3rxZBg4cuH79+sbGxsWLFx922GFR+b333tvkKSZMmBBuuueeez788MPDDz88CILjjjtuzZo1N998c5PD3n333eFeEydO/Kp3+c4774wO/umnn0bxpol+/fqtWLGisbFx2bJlffr0id101FFHff7557fddlv4IDra7bffHtXJzc397LPPGhsbV6xY0a9fv1tvvfWrfl/uvPPOcJf/9b/+1+rVq4899tjY5+rVq9fHH38cVb777rvD8ptvvjkqXLt27fHHHx+7V48ePZYsWXLvvfeGD2Kfbt26dQMGDPjXf/3XJqdx3333NWmBn//859HWjRs3Dho06MYbbywuLh48eHCYvRctWtTY2Lhp06aTTjqpeQNef/31mzdvDr8haq5z585vvfVWdPyHH344LC8sLAxL/v3f/z2q3LFjxz//+c/Nm27q1KlRnczMzAULFjQ2NpaVlZ1xxhnXXHNNk8rTpk2LKmdkZLz22mvTp0+PzbqvvvpqY2NjeXn5WWedddVVV0U7VlRUnH322ePHj//aP31hegylpKS8/PLLv/vd75KTk//4xz8+9thjYfm4ceO+avco6IbRdP78+c3rRFn60BITE59//vmnnnoqISFh3rx5sUeoq6s7//zzR44cGf44a9asFi1aPPvss42NjfX19RdccEEQBHFxcXPnzvV/GfBX0ycWAACAv5U+scC3xKeffhp2sk1PT3/ooYdWrVpVX1//4IMPrlq1KuyKtmjRon79+uXn58+aNeu9996L3ffxxx+vqqrKz89PSkqKCvv27Zufn7927dpw93feeWfv3r3XXXdd7969ow5s2dnZrVu3Puj5rFix4vrrr2/VqlWfPn3y8/PnzZtXVlaWn58fVXjqqac++uijIAguvfTSsNttEARHHnnkgw8+uH///qqqqltvvTXq/Tt69Ohw02OPPRb2v501a9Ynn3wSBEH37t3D89mwYcP9998f+xRBEPTu3fuBBx547LHH6urqDt2A//mf/7l8+fIgCLp16xa9wOrq6ilTptTV1fXs2TM/Pz8jIyOqv27dugkTJuTm5kaVQ8XFxWGL5eTkRJvWr18/Y8aM8vLy9evX33LLLSkpKWVlZTt27AjPPz8/f8+ePeFeF1xwwTnnnBN7wHnz5n3wwQdh79ni4uLwLl9OTk5+fn7Hjh2Li4tnzJjx/PPP19fX5+fn//jHPw5vhz7//PPLli3Lz89/7733Xn755SAIXnjhhYaGhvz8/M6dO0cHz87Ozs/P/+CDD5YuXZqfn5+VlbV3797f/va3NTU1FRUVsZ1mhw0bNmbMmC5dujRvumHDhkXl6enp2dnZ0aY//OEP4UHOPffcQYMGzZgxo3///j/+8Y/DkvCWcv/+/Zsfc/v27XfeeWf79u07duzY5D1tLjMzMz8/v3v37qmpqWE32h07dtx9992ZmZmZmZlXX311jx492rdvP3HixGXLljXpmfnZZ5+FD84+++wRI0YEQVBaWjphwoT8/PzwXvFXSU9PnzBhwtNPPz137tzY8tdff3379u1hX9m0tLT8/PxevXpFW2tra+fNm/fkk0+Gm6LyBQsWhCfWqVOn6LJp3br1EUccEQRBVVXVjBkzvvjii9TU1K9tjUPYs2fPgw8+WFVV1aZNm/z8/D59+tTX1//pT38qLS390Y9+1KRy69atf/azn0W9GN5+++25c+fm5+f37dv3EE9RU1Pz8MMP7927t/mm/fv3z5gxIzU1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S4e2cePGBx54IJpL84MPPujWrduIESNSUlKKi4tjT+8HP/hB1BN106ZNTc48Jyfnxhtv3LVr18yZM0eMGBE7feimTZsefPDBJnfMgiA4++yzw3tZ1dXVt99+exAEycnJt912W2yd1157bf369Q899FBGRkZjY+PYsWP37t0bVj7rrLOipQu/yuuvv15TU3PppZdGJW+88UaTiWrfeOONuXPn7ty5MypZsGBBOIPrGWec0aTz7ZtvvtnQ0HDxxRdHJX/+859XrFhRVFQ0YsSIaD2PDh06XHvttXPnzl2+fHlRUVHHjh3D8tNPP71v375z584tKytrbGy88MILTz/99K86jEnL2AAAFyhJREFU+dNOOy1qjZ07d86dOzd2wdWdO3dOnz69U6dOTVosCILy8vKDXlennHLKWWedFT6uqKiYO3fuO++889BDD40YMSI7Ozs9Pf2qq66KFrd89913w3YOgmDXrl2xi8GcdNJJgwYN+tpLt23btldeeWXbtm2/almawYMHX3XVVa+++uprr70WFTY2Np511lnheb7++uvV1dXRwjDRJfrAAw9s3LgxKhk4cODpp58+d+7cxYsXFxUVfe9734veiCAI9u7dO3fu3NgOtG3atBk7duxpp50WlfzqV78aMWJE7LOEe8Uu4Llv374vv/yyR48e+/btmzt37rp166ITjt6CqMVCH3/88V/3Z6e2tnbu3LkvvPBCbW3t008/vWTJkoSEhBEjRhx77LETJ06cO3dudI8dQLYE+GfKlhMnTowdrPhVXnrppZdeeil8PHTo0PPOO2/48OHDhw8PgmDz5s2bNm26+eabYxNXmC3XrVt30AXoYw0bNmzs2LFRkvzFL35x0AXTN2zYcP/994dDGf9yxcXF0YqLoSFDhvz85z/Pysp6++23Y4fYnXPOOVH/yXffffdPf/pT82x5ww03PPbYYz/4wQ9iX+mWLVvCJTeb+P73v3/TTTcFQXDTTTeF53DfffeFazzGfsRftGjRv//7vwdBMGDAgDlz5kyfPv2+++4LgqB169Zfmy0XLFhQUVExZ86caARdbW1tk3GDCxYsaLK24Ztvvhl2mIyPj2/Sc/jPf/7zjh075syZE3VBvO222xYuXPjb3/62Y8eOUaTp2LFjQUFBWVnZwoULY7v4Tpo0qVOnTuEqoLm5uXPmzDn66KNXrlx50JM//fTTo+S5evXqt956KzZblpeXz5gxY+LEieGak7HWrl0bdj9uYsiQIVH4Wbdu3bvvvrto0aLS0tIhQ4ZkZ2dnZGRcffXV4ZcUQRAsWrSoycjbyMknn/zTn/70q7ZG0tLSxo8fX1VVdYhsmZOTk5eXF3uorKysOXPmDBkypLS0NC8vr6Kiokm2XLJkSZMvUE488cSbbrpp8eLFb7311oYNG+bMmRObLcvKypYsWdI8W0Y/Tps27Ze//GU0TDpUU1Pz+9///o033mh+2uGmaDnK8ePHP/roo0EQPProo2ED/u3q6upmzZr18ssvB0EQdoNv3bp1//79hw0bdsQRR3z66aeyJfDPTp9YAAAAZEsAAAD+0fSJBf4phYsTtGrVauvWrY2NjbGb2rRp07Fjxx07doQD8LZv3x6Nodq6deuBAwcyMzM7deoUFxcXBMHevXu3bdvW2NgY7tWixX9/45aZmZmamhoEQVlZWZOBfGVlZdXV1UEQtGrVqnPnzuFxmsjMzCwvLy8uLq6oqCgtLW1oaGheZ8eOHaWlpeGyE2VlZZs2baqsrGxeraSkpKGhoX379i1btty2bVu0okYQBPv27du+fXt08MTExKysrNg1MyLt27fPyMjYvHnzvn37ysvLs7OzowVFduzYUVVVFdYJS3bu3Bm1WKiysrKmpqa4uLi2trZVq1adOnUKX37Hjh0TEv77/5Hy8vLw/KPd4+Pju3Tpsm3btp07d27ZsqVjx47RANd27dpFIwDbt29fUlKya9euv+R9b9myZXic7Ozs8Kn379+/ffv2aPfy8vLwcbjSyUF3j13fJTExsVOnTrt3766trd20aVOrVq3COgd99tra2m3bth30yOEp7d27t2vXrrHjeCPp6emdOnWKvRrT09PDvaqrq+vq6rZv315bWxvVr6ur27ZtW2zJpk2bms8/fFBpaWmdO3cuKyuLnistLS0hIaFLly5RswdBUF9fH/sUu3btKi4urqmpCR907NgxKSkptvKWLVvWrVuXkJAQtk99fX1JSUmTSyW6qGLf4oNe2M3Fx8d37NixtrY2HCVbWVm5efPmjIyM9u3bNzQ0hM8V1okdmRyqqqpqcib79+/v3r177EsIgqBFixadO3fOzMz8qk7mqampmZmZ4a9wVBLbaEEQVFdXH6KPelxcXMeOHRsaGvbt29dkr/Xr14dLDUUOHDiwdevW7du3p6amdurUqUePHo2Njdu3b2/RokXXrl3DEdcAsiXA/6yPP/74sssua9Gixa5du2LXFAmC4Pjjj58yZcq9994bjmuaNm1aND3Jrl27amtrf/KTn1xyySXhciNLly6dOHHivn37Tj755ClTpkQf5vLz88NBlXfddVc03jI0Y8aM+fPnB0EwevToc84556Cf/6666qq33377uuuu27dvX1VVVZMPlKGZM2eWlJRMmTJl/Pjxb7/99s9+9rODVquqqqqurr7hhht69Ohxyy23xH5MX7FixcSJE6OoM2LEiKuvvjp2SGRk7NixJ5xwwi233FJVVdWzZ8977rnn6KOPDjc98cQT//mf/xkEwQ033NCtW7cgCJ588skm6wcWFxfv3r372muvbdmyZb9+/e65554gCHr37j1lypQwZwZB8PDDD4eLQzz99NPheLYf//jHd95558SJE2fNmrV169YpU6Z06dIlrDx69OhoOZCNGzfeeeedn3766V/yvh922GFTpkzJyclp06ZN586dgyDYsGHDxIkT33vvvfBMnnnmmccffzwIgs2bNzffPVyt9OSTT47m+AlLwmVgbrrppnDZw3AFyOY2b958yy23HHTQY9euXR944IF9+/YlJSWFzdjEBRdc0L1796lTp0aLVV5++eXjxo2777779u7dW1xcPHHixNjhdqWlpRMnTvziiy9iw1Ls8MJDGD58+MiRI2fOnBlNQ3XZZZddffXVU6ZM2bNnT+xT3HLLLdG40D/+8Y8ffvjhl19+uX379m3btk2ZMiW6SMKvDCZNmpSSktKxY8ewfcrLy8OSg4bbK664IlpA8plnnnnmmWf+kkh82223rVmzJhym++qrr5aUlFxxxRW9e/d+6KGH7rzzztTU1HBd1nBVoVivvfZabFsFQTBkyJCZM2f27Nlz2bJlUWFKSsovf/nLnJycr1ri5cwzz5w4cWIQBB06dIhKmpz8iy+++FVXSBAESUlJN998844dO5qMRl64cOG4cePWrl3b5NuK++67b/PmzbfeeuuECRPy8/P3798/ceLE1NTUyZMnN1mBE0C2BPgfsWvXro8++uigm9LT0wcMGBDddli/fn2TaXUOP/zwI488MnxcWVn50Ucf7dmzJzMzM/aW4OGHHx4u1hd9xIxs2LAhnHTk6quvjo7TRI8ePdauXfvZZ58d4nbcxo0bV69e3dDQcNhhh3355ZfLli0rLy8/RKbKzc1tckOsurp66dKlZWVl4Y9jxoz5qtXwunfvnpOTs3z58q1bt7Zq1apfv35hMAtzY/hytm3bFoai4uLi4uLi5gcJ4198fHx4pyslJaV///45OTnh1uiAmzZtCiNNXl5e3759W7VqVVxcvGLFithbcN26dYsCWFxc3OrVq7du3fqXvO/JycnHHntsNIVPEAR79+797LPPSktLw2y5ZcuWQ8yp26ZNm2OOOSY7OzvKlmHJ559/vm/fvjCE7Nu3r/kqqaF9+/Z9/vnnUTiM1bp169gk1lx4f3LdunVR1Pn+97/funXrfv36hRdtky8p9u/fv3z58k8++eSv+O3IysrKzc3duHFj9Dvyve99r1WrVtGCnNGVHJsMt27dGr4Le/bs+fTTT2NTaBAEdXV1YQrt2rVruCkqaa5Lly7dunULf4OCIIgWUD20xMTEPn36RNfJ9u3bP//8865du1ZUVNTX14dLj3bo0CHsNdDE9u3bt2/fHltywgknxE7g/N8fehIScnNzD7rwZqhjx47RaUclTe5jf/bZZ4d4FfHx8UceeWTULyCyY8eO5nc7Gxsb16xZs379+vj4+COOOCK8xtLT0zMyMprMQgQgWwL8j0tKSmrXrl1NTc2ePXuysrL279/frl27r8qcLVq0qKioqKioiJZe2LFjR2ykjER1WrZsGd1ta9++fWwP2IqKirDvX9STNgiCmpqa8vLy5jcP09PTm+weK+xeG/Xf27VrV319fXjk2traMHO2bNmyc+fO0UIpdXV1ZWVlDQ0NaWlp4YS3B532tmXLlu3atUtOTg53b9GiRWZmZnS/t127dmlpaeELrK+vr6ys7NChQ2VlZZQrWrZsmZGREdvPNjMz86Ddbtu2bRsep6qqKuxFXFlZuWvXrszMzPr6+rS0tLKysthsnJiY2K5du6hLbVTS/D5YZWVlRUVF+/bta2pq0tPTd+zYEdslMty0d+/eDh06HPTEUlNTw+7NYU6Ifcbg/+96WlVVlZCQEJ5PRkbGzp07w37CBxV7wKikrq6uvLy8vr4+PE70SquqqqKLbdu2bU3usYd7xb6c+Pj4du3aNU8msV8ohAeMGioqCfNhmM3i4+M7dOjQpUuXhoaG8vLy2DqhlJSUsE7btm3DF5uSkpKcnFxeXh52e459s1JSUqJT6tSp00FX60lOTg4v+z179jQ0NJSVlUXPWF9fH1264RUYHx9fWloa+6uanJwc1klOTg4vpOgiDDeVl5fX1taGR961a1d4nC5duhw4cCDc1KJFi4yMjLA/QhAEsb+DBw4c2LFjx5YtW+Li4tq1a9emTZvolzq69rZu3ZqSkpKYmBiedps2bZosVBMep7y8vKKiIjxOq1atUlJSwmeMStq0abN79+79+/dnZWVFJ9NEXFxcRkZG9Puenp5+4MCBioqKmpqampqaffv2tWrVKjyN1q1bf9UfNADZEuDv7Pjjj588efKLL764b9++mTNnhvnkoJ99f/KTn6Snp0+aNGnatGnz5s0LC8vLyw86hm3GjBkvvPBCEAQXXHBB1CMuIyMjNgY88sgjpaWlkydPjo1Dn3322aRJk6699tomQ8LGjx8/ZsyYg3YgDIKgX79+M2fODFdfDILg17/+dXFx8eTJk9PS0pYuXTpp0qQgCPr27fvoo49G4eTFF1987LHHqqqqCgsLL7jggiAIDtqDLjc3d/LkyQMGDEhJSZk+fXptbW3btm0zMjKmTZu2evXqyZMnjx079uyzzw6C4A9/+MPTTz999913P/74488++2y4e+/evSdPnhx78zY1NfWga6VcdtllYTfXoqKisJPtU089tXbt2ttvvz09PX3Tpk2TJ0+OvYubm5t7xx13xH7E79Gjx+TJk8O1MWPNnj37zTffnDhxYjgy85577om9wZuVlTVhwoTMzMzk5OSsrKzmJ5aXlxctTdG8TnFx8Y033lhWVpaTkzN58uTu3btv3br1wQcf/PDDD7/qkrvwwguvuOKK2JJu3bpt3rz5tttuW79+fbdu3WJ7M86bNy+6eRj2fY3dsbS0dNKkSaecckq0KklWVtYdd9xx5plnNkmhkRdffDG8gXzJJZeEb9z8+fOjO2k1NTXhXfqw5+ru3bvDp3jppZc+//zz2OOMHDnyyiuvvPvuux955JFwPZVzzz33wgsvvO2224455pgbb7yxd+/eUeVzzz23oKAg+h6kd+/eCxcubHJiP/zhD3/6058GQTB37twZM2bcdtttURw9+eSTp02bFt7kz8jIuP322//0pz9dc801kydPjnYfOnToL37xi9zc3G7duoVPPW/evLCX9dChQ9u3b3/bbbd98sknVVVVd95556ZNm37605/eeuut4fcXkyZN+uSTT1JSUm699dboXmXsG7179+677rorPT097Gt61llnNenmunjx4uuuu2706NHl5eUjR44MgmDYsGETJkxo8hr37t07ZcqUl156Kez4OmjQoPj4+Nzc3HXr1iUlJU2YMGHw4MH79++fPXt2amrqE088kZube9AuAC1btpwwYcJJJ50UfeVRW1v7q1/96r333jtw4MDKlSsTExPD0xg6dOgvf/lLf+cB2RLgm9C+fftTTjnliSeeqKioOOmkk5pP8hE54ogjwltba9as+dp15KI648aNO/XUUw9aZ+3atcuXL28yT8+uXbvef//9Cy64oMn8H7169TpEn8n09PTog2YQBLNmzaqqqho8eHB40y+8g5Senj548OCozjPPPBP2ruzZs+dXnWEQBGlpaYMGDQo7rA4aNCgqX7du3WeffVZbW9uzZ88wCD333HMbNmzo379/dnZ2VK1t27Ynnnhi165dv/aNOPzwww8//PAw/IQlGzZs6Nix4zHHHNO9e/fFixcvW7Zs48aNUf2ampomqT41NXXgwIFRJ9vIhg0b1q5de/TRR/fs2fPjjz9evnz5l19+GW3t379/v379YoNQE4cddtgh2mfv3r0ff/xxGO9POOGEPn36LFu2bOXKldFIxea6d+/e/IArVqwIzy03Nzd23GzUQ/ig9u3bt3Tp0tjmbd269fHHH3/YYYd91SW6efPmcChptApoVBKrdevWxx13XBAE69evT01NXb16dZP7loMHD05KSurfv390oXbt2vXEE09MTU0NH8RWzs7OPkQbNqnz0Ucf1dbWxnYcPf7446Nrr2XLlscee+zChQsXL14ce3O4S5cuYZ3oRno0BLdLly6DBw8O70PW19cvW7bsyy+/TExMPOaYY4IgKCsrCydnSkxMPProow96nvX19WG0zsjI2LVr14ABA5p8xbBy5coPP/zwF7/4RV1dXTieNjc3t/lxGhoali9fvnbt2tTU1H79+sU+V3x8fFhSXV3961//Oisrq/m3JLGV+/btG7v73r17V6xYETuUN+zi2+TPCMD/46xBAgAAgGwJAADAP5o+scDfTY8ePcaPH99ktcmvctxxx4UT23Tv3v3KK6/s2bNnYmJi+CCscMYZZ+zfvz92mpyw8hVXXBGNSwyC4Nhjj42Pjz/99NP37t0bO5XL6aef3mTUZe/evVNTU8eNGxc7YWmkX79+4SwvXbt2HTt2bNRds/lMsKeeemo0JU/fvn2bzN2anZ09ZsyY3NzczMzMMWPGRN0joy52Q4YMiWYPys3NPehsH6ecckqvXr3CTVlZWZdeemnzCWBPPvnk8IUcddRRzTdFM5327t37oP2ETzrppC5dusTOTTp48ODOnTu3adNm8ODB0TQqPXv2POgUQYMHD+7QocNBNw0aNGj8+PHRJREOMe3QocPIkSOj2VmDIDjssMPCGXEyMzNHjhy5Y8eO7t27x86RM3DgwOTk5LCjbPggCIL27dvn5eVFU+MGQZCTkxM7882AAQOiZw/179+/+Um2a9duxIgRsZPTZmdnh10rMzIyLrroomhT7Fyj6enpF110UfPZR8NNF1544UknndS5c+dwDpiwJLYbcxMDBgxIS0u74IILjj322PDBwIEDO3XqFM7d0rZt2/PPP/8Qk4UOHDgwNTX1xz/+cfPzie3RGtZp3ghRnWOOOSZssUGDBqWkpJx33nmxHYyTk5OHDx8eOzFv6Oijj27SztEr7devX5NNsf29o1+cSy65pHPnzn379g0rN+9BetRRR4V1giBISko699xzoxOLrRxu6tWrV0pKSpMZekJ9+vSJzqf5LD7Rb+KYMWOys7NbtWoVVj5o39rExMRzzjmnW7duSUlJsT2ZjzzyyLFjx4YliYmJP/jBD6KZhI444ogmrREEQcuW/187d2zCUAgFUJSHkAEcIBY6iuAgbpQiu9ql+PAJkUBCqsA5rWBh5YWnl5fZ75TSGGN/MHyeamtt32eXUiqlrLXmnKWU56WI6L2ff1nVWuecx5e5x1LOOSJM4QK/iA9vgQAAAPCOmVgAAAC0JQAAANoSAAAAbQkAAIC2BAAAAG0JAACAtgQAAEBbAgAAoC0BAABAWwIAAKAtAQAA0JYAAABoSwAAANCWAAAAaEsAAAC0JQAAANoSAAAAtCUAAADaEgAAAG0JAACAtgQAAABtCQAAgLYEAABAWwIAAKAtAQAAQFsCAACgLQEAAPjrtrzdrxER4UgAAAD40gPPkXeuNmpDBQAAAABJRU5ErkJggg==" />
          <div class="t m0 x1 h2 y1 ff1 fs0 fc0 sc0 ls1 wsc">Form I-90 02/27/17 N<span class="_ _1c"> </span>Page 5 of 7</div>
          <div class="t m0 xd h3 y118 ff1 fs1 fc0 sc0 ls1 wsc">Interpreter&apos;s Given Name (First Name)<span class="_ _1d"></span><span class="ff2">1.b.</span></div>
          <div class="t m0 xd h3 y119 ff1 fs1 fc0 sc0 ls1 wsc" style=" left: -41px; top: 87px;">
            Interpreter&apos;s Family Name (Last Name)<span class="_ _1e"></span><span class="ff2">1.a.<span class="ff1">  </span></span>
          </div>
          <div class="t m0 xd h3 y11a ff1 fs1 fc0 sc0 ls1 wsc">Interpreter&apos;s Business or Organization Name (if any)<span class="_ _1f"></span><span class="ff2">2.</span></div>
          <div class="t m0 x1c h9 y11b ff4 fs5 fc0 sc0 ls1 wsc">Interpreter&apos;s Full Name</div>
          <div class="t m0 x1 h8 y11c ff1 fs1 fc0 sc0 ls1 wsc">Provide the following information about the interpreter.</div>
          <div class="t m0 x1c h7 y11d ff2 fs5 fc0 sc0 ls1 wsc">Part 6. Interpreter&apos;s Contact Information, </div>
          <div class="t m0 x1c h7 y11e ff2 fs5 fc0 sc0 ls1 wsc">Certification, and Signature</div>
          <div class="t m0 x1 h3 y11f ff2 fs1 fc0 sc0 ls1">3.h.</div>
          <div class="t m0 x1 h9 y120 ff4 fs5 fc0 sc0 ls1 wsc">Interpreter&apos;s Mailing Address</div>
          <div class="t m0 x1 h3 y121 ff2 fs1 fc0 sc0 ls1 ws9">3.c.<span class="_"> </span><span class="ff1 wsc">City or Town</span></div>
          <div class="t m0 x1 h3 y122 ff2 fs1 fc0 sc0 ls1 ws8" style="left:-65px;top: 304px;">
            3.d.<span class="_"> </span><span class="ff1 ws5">State<span class="_"> </span></span><span class="ws9">3.e.<span class="_"> </span><span class="ff1 wsc">ZIP Code</span></span>
          </div>
          <div class="t m0 x1 h3 y123 ff2 fs1 fc0 sc0 ls1 ws6">3.f.<span class="_"> </span><span class="ff1 wsc">Province </span></div>
          <div class="t m0 xd h8 y124 ff1 fs1 fc0 sc0 ls1 wsc">Street Number </div>
          <div class="t m0 xd h8 y125 ff1 fs1 fc0 sc0 ls1 wsc">and Name</div>
          <div class="t m0 x1 h3 y124 ff2 fs1 fc0 sc0 ls1">3.a.</div>
          <div class="t m0 xd h8 y11f ff1 fs1 fc0 sc0 ls1 wsc">Country </div>
          <div class="t m0 x1 h3 y126 ff2 fs1 fc0 sc0 ls1 wsa" style="left: -65px; top: 256px;">
            3.b.<span class="_"> </span><span class="ff1 wsb">Apt.<span class="_"> </span>Flr.<span class="_ _3"></span>Ste.</span>
          </div>
          <div class="t m0 x1 h3 y127 ff2 fs1 fc0 sc0 ls1 ws0">3.g.<span class="_"> </span><span class="ff1 wsc">Postal Code </span></div>
          <div class="t m0 x1 h9 y128 ff4 fs5 fc0 sc0 ls1 wsc"> Interpreter&apos;s Contact Information</div>
          <div class="t m0 x1 h3 y129 ff2 fs1 fc0 sc0 ls1 ws1d">4.<span class="_"> </span><span class="ff1 wsc">Interpreter&apos;s Daytime Telephone Number</span></div>
          <div class="t m0 xd h3 y12a ff1 fs1 fc0 sc0 ls1 wsc">Interpreter&apos;s Email Address (if any)<span class="_ _20"></span><span class="ff2">6.</span></div>
          <div class="t m0 x1 h3 y12b ff2 fs1 fc0 sc0 ls1 ws1d">5.<span class="_"> </span><span class="ff1 wsc">Interpreter&apos;s Mobile Telephone Number (if any)</span></div>
          <div class="t m0 x1c h9 y12c ff4 fs5 fc0 sc0 ls1 wsc">Interpreter&apos;s Certification</div>
          <div class="t m0 x1 h8 y12d ff1 fs1 fc0 sc0 ls1 wsc">I certify, under penalty of perjury, that:</div>
          <div class="t m0 x1 h3 y12e ff1 fs1 fc0 sc0 ls1 wsc">which is the same language provided in <span class="ff2">Part 5.</span>, <span class="ff2">Item Number </span></div>
          <div class="t m0 x1 h3 y12f ff2 fs1 fc0 sc0 ls1">1.b.<span class="ff1 wsc">, and I have read to this applicant in the identified language </span></div>
          <div class="t m0 x1 h8 y130 ff1 fs1 fc0 sc0 ls1 wsc">every question and instruction on this application and his or her </div>
          <div class="t m0 x1 h8 y131 ff1 fs1 fc0 sc0 ls1 wsc">answer to every question. The applicant informed me that he or </div>
          <div class="t m0 x1 h8 y132 ff1 fs1 fc0 sc0 ls1 wsc">she understands every instruction, question, and answer on the </div>
          <div class="t m0 x1 h3 y133 ff1 fs1 fc0 sc0 ls1 wsc">application, including the <span class="ff2">Applicant&apos;s Certification</span>, and has </div>
          <div class="t m0 x1 h8 y134 ff1 fs1 fc0 sc0 ls1 wsc">verified the accuracy of every answer.</div>
          <div class="t m6 x1 h8 y135 ff1 fs1 fc0 sc0 ls1 wsc">I am fluent in English and ,</div>
          <div class="t m0 x26 h3 y136 ff1 fs1 fc0 sc0 ls1 wsc">(mm/dd/yyyy)<span class="_ _19"></span>Date of Signature<span class="_ _1a"></span><span class="ff2">7.b.</span></div>
          <div class="t m0 xf h3 y137 ff1 fs1 fc0 sc0 ls1 wsc">Interpreter&apos;s Signature (sign in ink)<span class="_ _21"></span><span class="ff2">7.a.</span></div>
          <div class="t m0 x23 h9 y49 ff4 fs5 fc0 sc0 ls1 wsc">Interpreter&apos;s Signature</div>
          <div class="t m0 x23 h7 y138 ff2 fs5 fc0 sc0 ls1 wsc">Part 7. Contact Information, Declaration, and </div>
          <div class="t m0 x23 h7 y139 ff2 fs5 fc0 sc0 ls1 wsc">Signature of the Person Preparing this </div>
          <div class="t m0 x23 h7 y13a ff2 fs5 fc0 sc0 ls1 wsc">Application, if Other Than the Applicant</div>
          <div class="t m0 x23 h9 y13b ff4 fs5 fc0 sc0 ls1 wsc">Preparer&apos;s Full Name</div>
          <div class="t m0 x10 h3 y13c ff2 fs1 fc0 sc0 ls1 wsc">1.a. <span class="_ _8"> </span><span class="ff1 v0">Preparer&apos;s Family Name (Last Name)</span></div>
          <div class="t m0 xf h8 y13d ff1 fs1 fc0 sc0 ls1 wsc">Preparer&apos;s Given Name (First Name)</div>
          <div class="t m0 x10 h3 y13e ff2 fs1 fc0 sc0 ls1">1.b.</div>
          <div class="t m0 x10 h8 y13f ff1 fs1 fc0 sc0 ls1 wsc">Provide the following information about the preparer.</div>
          <div class="t m0 xf h3 y140 ff1 fs1 fc0 sc0 ls1 wsc">Preparer&apos;s Business or Organization Name (if any)<span class="_ _22"></span><span class="ff2">2.</span></div>
          <div class="t m0 x10 h9 y141 ff4 fs5 fc0 sc0 ls1 wsc"> Preparer&apos;s Mailing Address</div>
          <div class="t m0 x10 h3 y142 ff2 fs1 fc0 sc0 ls1">3.h.</div>
          <div class="t m0 x10 h3 y143 ff2 fs1 fc0 sc0 ls1 ws9">3.c.<span class="_"> </span><span class="ff1 wsc">City or Town</span></div>
          <div class="t m0 x10 h3 y144 ff2 fs1 fc0 sc0 ls1 ws8" style="left: 217px; top: 417px; ">
            3.d.<span class="_"> </span><span class="ff1 ws5">State<span class="_"> </span></span><span class="ws9">3.e.<span class="_"> </span><span class="ff1 wsc">ZIP Code</span></span>
          </div>
          <div class="t m0 x10 h3 y145 ff2 fs1 fc0 sc0 ls1 ws6">3.f.<span class="_"> </span><span class="ff1 wsc v0">Province </span></div>
          <div class="t m0 xf h8 y146 ff1 fs1 fc0 sc0 ls1 wsc">Street Number </div>
          <div class="t m0 xf h8 y147 ff1 fs1 fc0 sc0 ls1 wsc">and Name</div>
          <div class="t m0 x10 h3 y146 ff2 fs1 fc0 sc0 ls1">3.a.</div>
          <div class="t m0 xf h8 y142 ff1 fs1 fc0 sc0 ls1 wsc">Country </div>
          <div class="t m0 x10 h3 y148 ff2 fs1 fc0 sc0 ls1 wsa" style="left: 217px; top: 369px;">
            3.b.<span class="_"> </span><span class="ff1 ws2">Apt.<span class="_"> </span>Flr.<span class="_ _3"></span>Ste.</span>
          </div>
          <div class="t m0 x10 h3 y149 ff2 fs1 fc0 sc0 ls1 ws0">3.g.<span class="_"> </span><span class="ff1 wsc">Postal Code </span></div>
          <div class="t m0 x10 h9 y14a ff4 fs5 fc0 sc0 ls1 wsc"> Preparer&apos;s Contact Information</div>
          <div class="t m0 x10 h3 y14b ff2 fs1 fc0 sc0 ls1 ws1d">4.<span class="_"> </span><span class="ff1 wsc">Preparer&apos;s Daytime Telephone Number</span></div>
          <div class="t m0 x10 h3 y14c ff2 fs1 fc0 sc0 ls1 ws1d">6.<span class="_"> </span><span class="ff1 wsc">Preparer&apos;s Email Address (if any)</span></div>
          <div class="t m0 x10 h3 y14d ff2 fs1 fc0 sc0 ls1 ws1d">5.<span class="_"> </span><span class="ff1 wsc">Preparer&apos;s Mobile Telephone Number (if any)</span></div>
        </div>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 80px; left: 64px;">@InterpreterInformation.LastName </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 117px; left: 64px;">@InterpreterInformation.FirstName </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 153px; left: 64px;">@InterpreterInformation.OrganizationName </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 206px; left: 128px;">@InterpreterInformation.StreetNoAndName </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 231px; left: 62px;">@InterpreterInformation.Apt </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 231px; left: 104px;">@InterpreterInformation.Ste </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 231px; left: 146px;">@InterpreterInformation.Flr </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 231px; left: 188px;">@InterpreterInformation.Number </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 255px; left: 129px;">@InterpreterInformation.CityOrTown </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 278px; left: 84px;">@InterpreterInformation.State </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 278px; left: 195px;">@InterpreterInformation.ZipCode </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 302px; left: 129px;">@InterpreterInformation.Province </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 326px; left: 129px;">@InterpreterInformation.PostalCode </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 362px; left: 65px;">@InterpreterInformation.Country </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" Bottom: 241px; left: 65px;">@InterpreterInformation.DaytimePhoneNo </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" Bottom: 205px; left: 65px;">@InterpreterInformation.MobileNo </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" Bottom: 169px; left: 65px;">@InterpreterInformation.Email </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" Bottom: 103px; left: 141px;">@InterpreterInformation.Certification </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 27px; left: 347px;">@InterpreterInformation.InterpreterSignature </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 47px; left: 495px;">@InterpreterInformation.SignatureDate </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 196px; left: 347px;">@PreparerInformation.LastName </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 231px; left: 347px;">@PreparerInformation.FirstName </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 267px; left: 347px;">@PreparerInformation.OrganizationName </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 320px; left: 411px;">@PreparerInformation.StreetNoAndName </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 344px; left: 344px;">@PreparerInformation.Apt </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 344px; left: 386px;">@PreparerInformation.Ste </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 344px; left: 428px;">@PreparerInformation.Flr </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 344px; left: 471px;">@PreparerInformation.Number </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 369px; left: 412px;">@PreparerInformation.CityOrTown </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 391px; left: 368px;">@PreparerInformation.State </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 391px; left: 478px;">@PreparerInformation.ZipCode </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 416px; left: 411px;">@PreparerInformation.Province </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 440px; left: 411px;">@PreparerInformation.PostalCode </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" top: 475px; left: 346px;">@PreparerInformation.Country </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style=" bottom: 125px; left: 346px;">@PreparerInformation.DaytimePhoneNo </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 85px; left: 346px; ">@PreparerInformation.MobileNo </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 52px; left: 346px; ">@PreparerInformation.Email </p>



        <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
      </div>
      <div id="pf6" class="pf w0 h0" data-page-no="6">
        <div class="pc pc6 w0 h0">
          <img class="bi x0 y0 w1 h1" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABMkAAAYxCAIAAAAsbFyeAAAACXBIWXMAABYlAAAWJQFJUiTwAAAgAElEQVR42uzdMW7jMABEUc2C15Dvf67oGgEmxfa7gInQNvVe74KjIvmmkKTtAQAAABP+mAAAAABtCQAAgLYEAABAWwIAAKAtAQAAQFsCAACgLQEAANCWAAAAaEsAAADQlgAAAGhLAAAAtCUAAADaEgAAALQlAAAA2hIAAABtCQAAgLYEAAAAbQkAAIC2BAAAQFsCAACgLQEAAEBbAgAAoC0BAADQlgAAAGhLAAAA0JYAAABoSwAAALQlAAAA2hIAAAC0JQAAANoSAAAAbQkAAIC2BAAAAG0JAACAtgQAAEBbAgAAoC0BAABAWwIAAKAtAQAA0JYAAABoSwAAANCWAAAAaEsAAAC0JQAAANoSAAAAtCUAAADaEgAAAG0JAACAtgQAAABtCQAAgLYEAABAWwIAAKAtAQAAQFsCAACgLQEAANCWAAAAaEsAAADQlgAAAGhLAAAAtCUAAADaEgAAALQlAAAA2hIAAABtCQAAgLYEAACA/xi7HiyJpwsAALyVtrsezb0lAAAA2hIAAABtCQAAgLYEAABAWwIAAIC2BAAAQFsCAACgLQEAANCWAAAAoC0BAADQlgAAAHyytLUCAAAAM9xbAgAAoC0BAADQlgAAAGhLAAAA7m7serAkni4AAPBWNv5bqu4tAQAAFvn+/t71aP4HCQAAALPcWwIAAKAtAQAA0JYAAABoSwAAALQlAAAAaEsAAAC0JQAAANoSAAAAbQkAAADaEgAAAG0JAACAtgQAAEBbAgAAgLYEAABAWwIAAKAtAQAA0JYAAACgLQEAANCWAAAAaEsAAAC0JQAAADxnbHmqJB4tAMdxtDUCACzg3hIAAIBZY+OzfX19ecAAt/V4PIwAAMu4twQAAEBbAgAAoC0BAADQlgAAAGhLAAAA0JYAAABoSwAAALQlAAAA2hIAAAC0JQAAANoSAAAAbQkAAIC2BAAAAG0JAACAtgQAAEBbAgAAoC0BAABAWwIAAKAtAQAA0JYAAABoSwAAANCWAAAAaEsAAAC0JQAAANoSAAAAtCUAAADaEgAAAG0JAACAtgQAAABtCQAAgLYEAABAWwIAAKAtAQAAQFsCAACgLQEAANCWAAAAaEsAAADQlgAAAGhLAAAAtCUAAADaEgAAALQlAAAA2hIAAABtCQAAgLYEAAAAbQkAAIC2BAAAQFsCAACgLQEAAEBbAgAAoC0BAADQlgAAAGhLAAAA0JYAAABoSwAAALQlAAAA2hIAAAC0JQAAANoSAAAAbQkAAIC2BAAAAG0JAACAtgQAAEBbAgAAoC0BAABAWwIAAKAtAQAA0JYAAABoSwAAANCWAAAAaEsAAAC0JQAAANoSAAAAtCUAAADaEgAAAG0JAACAtgQAAABtCQAAgLYEAABAWwIAAKAtAQAAQFsCAACgLQEAANCWAAAAaEsAAADQlgAAAGhLAAAAtCUAAADaEgAAALQlAAAA2hIAAABtCQAAgLYEAAAAbQkAAIC2BAAAQFsCAACgLQEAAEBbAgAAoC0BAADQlgAAAGhLAAAA0JYAAABoSwAAALQlAAAA2hIAAAC0JQAAANoSAAAAbQkAAIC2BAAAAG0JAACAtgQAAEBbAgAAoC0BAABAWwIAAKAtAQAA0JYAAABoSwAAAPgrbTc8VeLRAnAcx5Y/5gDgDbm3BAAAYFZ8oQsAAMAk95YAAABoSwAAALQlAAAA2hIAAABtCQAAANoSAAAAbQkAAIC2BAAAQFsCAACAtgQAAOCVxq4Hu67L0wW4ufM8jQAAa7i3BAAAQFsCAACgLQEAANCWAAAAaEsAAADQlgAAAGhLAAAAtCUAAADaEgAAALQlAAAA2hIAAABtCQAAgLYEAAAAbQkAAIC2BAAAQFsCAACgLQEAAEBbAgAAoC0BAADQlgAAAGhLAAAA0JYAAABoSwAAALQlAAAA2hIAAAC0JQAAANoSAAAAbQkAAIC2BAAAAG0JAACAtgQAAEBbAgAAoC0BAABAWwIAAKAtAQAA+DRpawUAAABmuLcEAABAWwIAAKAtAQAA0JYAAABoSwAAANCWAAAAaEsAAAC0JQAAANoSAAAAtCUAAADaEgAAAG0JAACAtgQAAABtCQAAgLYEAABAWwIAAKAtAQAAQFsCAACgLQEAANCWAAAAaEsAAADQlgAAAGhLAAAAtCUAAAD3NEywTJKZj7e1IQAAoC15vg8nuxQAAOBXeScWAAAAbQkAAIC2BAAAQFsCAACgLQEAAEBbAgAAoC0BAADQlgAAAGhLAAAA0JYAAABoSwAAALQlAAAA2hIAAAC0JQAAANoSAAAAbQkAAIC2BAAAAG0JAADAqwwTrJTECAAAwIax09YKAAAAzPBOLAAAANoSAAAAbQkAAIC2BAAAQFsCAACAtgQAAEBbAgAAoC0BAADQlgAAAKAtAQAA0JYAAABoSwAAALQlAAAAaEsAAAC0JQAAANoSAAAAbQkAAADaEgAAAG0JAACAtgQAAEBbAgAAgLYEAABAWwIAAKAtAQAA0JYAAACgLQEAANCWAAAAaEsAAAC0JQAAAGhLAAAAtCUAAADaEgAAAG0JAAAA2hIAAABtCQAAgLYEAABAWwIAAIC2BAAAQFsCAACgLQEAANCWAAAAoC0BAADQlgAAAGhLAAAAtCUAAABoSwAAALQlAAAA2hIAAABtCQAAANoSAAAAbQkAAIC2BAAAQFsCAACAtgQAAEBbAgAAoC0BAADQlgAAAKAtAQAA0JYAAABoSwAAALQlAAAAaEsAAAC0JQAAANoSAAAAbQkAAADaEgAAAG0JAACAtgQAAEBbAgAAwL8NEyyTZObjbW0IAABoS57vw8kuBQAA+FXeiQUAAEBbAgAAoC0BAADQlgAAAGhLAAAA0JYAAABoSwAAALQlAAAA2hIAAAC0JQAAANoSAAAAbQkAAIC2BAAAAG0JAACAtgQAAEBbAgAAoC0BAABAWwIAAPAqwwQrJTECAACwYey0tQIAAAAzvBMLAACAtgQAAEBbAgAAoC0BAADQlgAAAKAtAQAA0JYAAABoSwAAALQlAAAAaEsAAAC0JQAAANoSAAAAbQkAAADaEgAAAG0JAACAtgQAAEBbAgAAgLYEAABAWwIAAKAtAQAA0JYAAACgLQEAANCWAAAAaEsAAAC0JQAAAGhLAAAAtCUAAADaEgAAgDsaJriJJDMfb2ufO+8DAADaktn+mewu+wAAwPa8EwsAAIC2BAAAQFsCAACgLQEAANCWAAAAoC0BAADQlgAAAGhLAAAAtCUAAABoSwAAALQlAAAA2hIAAABtCQAAANoSAAAAbQkAAIC2BAAAQFsCAACAtgQAAOBVhgnuI4kR7AMAAL/y63RbKwAAADDDO7EAAABoSwAAALQlAAAA2hIAAABtCQAAANoSAAAAbQkAAIC2BAAAQFsCAACAtgQAAEBbAgAAoC0BAADQlgAAAKAtAQAA0JYAAABoSwAAALQlAAAAaEsAAAC0JQAAANoSAAAAbQkAAADaEgAAAG0JAACAtgQAAEBbAgAAgLYEAABAWwIAAKAtAQAA0JYAAACgLQEAANCWAAAAaEsAAAC0JQAAAGhLAAAAtCUAAADaEgAAAG0JAAAA2hIAAABtCQAAgLYEAABAWwIAAIC2BAAAQFsCAACgLQEAANCWAAAAoC0BAADQlgAAAGhLAAAAtCUAAABoSwAAALQlAAAA2hIAAABtCQAAANoSAAAAbQkAAIC2BAAAQFsCAACAtgQAAEBbAgAAoC0BAADQlgAAAKAtAQAA0JYAAABoSwAAALQlAAAAaEsAAAC0JQAAANoSAAAAbQkAAADaEgAAAG0JAACAtgQAAEBbAgAAgLYEAABAWwIAAKAtAQAA0JYAAACgLQEAANCWAAAAaEsAAAC0JQAAAGhLAAAAtCUAAADaEgAAAG0JAAAA2hIAAABtCQAAgLYEAABAWwIAAIC2BAAAQFsCAACgLQEAANCWAAAAoC0BAADQlgAAAGhLAAAAtCUAAABoSwAAALQlAAAA2hIAAABtCQAAANoSAAAAbQkAAIC2BAAAQFsCAACAtgQAAEBbAgAAoC0BAADQlgAAAKAtAQAA0JYAAABoSwAAALQlAAAAaEsAAAC0JQAAANoSAAAAbQkAAADaEgAAAG0JAACAtgQAAEBbAgAAgLYEAABAWwIAAKAtAQAA0JYAAACgLQEAANCWAAAAaEsAAAC0JQAAAGhLAAAAtCUAAADaEgAAAG0JAACAtgQAAABtCQAAgLYEAABAWwIAAKAtAQAAQFsCAACgLQEAANCWAAAAaEsAAADQlgAAAGhLAAAAtCUAAADaEgAAALQlAAAA2hIAAABtCQAAgLYEAAAAbQkAAIC2BAAAQFsCAACgLQEAAEBbAgAAoC0BAADQlgAAAGhLAAAA0JYAAABoSwAAALQlAAAA2hIAAAC0JQAAANoSAAAAbQkAAIC2BAAAAG0JAACAtgQAAEBbAgAAoC0BAABAWwIAAKAtAQAA0JYAAABoSwAAANCWAAAAaEsAAAC0JQAAANoSAAAAtCUAAADaEgAAAG0JAACAtgQAAABtCQAAgLYEAABAWwIAAKAtAQAAQFsCAACgLQEAANCWAAAAaEsAAADQlgAAAGhLAAAAtCUAAADaEgAAALQlAAAA2hIAAABtCQAAgLYEAAAAbQkAAIC2BAAAQFsCAACgLQEAAEBbAgAAoC0BAADQlgAAAGhLAAAA0JYAAABoSwAAALQlAAAA2hIAAAC0JQAAANoSAAAAbQkAAIC2BAAAAG0JAACAtgQAAEBbAgAAsKex68Gu6/J0AW7uPE8jAMAa7i0BAADQlgAAAGhLAAAAtCUAAADaEgAAALQlAAAA2hIAAABtCQAAgLYEAAAAbQkAAIC2BAAAQFsCAACgLQEAAEBbAgAAoC0BAADQlgAAAGhLAAAA0JYAAABoSwAAALQlAAAA2hIAAAC0JQAAANoSAAAAbQkAAIC2BAAAAG0JAACAtgQAAEBbAgAAoC0BAABAWwIAAKAtAQAA0JYAAABoSwAAANCWAAAAaEsAAAA+TdpaAQAAgBnuLQEAANCWAAAAaEsAAAC0JQAAANoSAAAAtCUAAADaEgAAAG0JAACAtgQAAABtCQAAgLYEAABAWwIAAKAtAQAAQFsCAACgLQEAANCWAAAAaEsAAADQlgAAAGhLAAAAtCUAAADaEgAAALQlAAAA2hIAAABtCQAAgLYEAAAAbQkAAIC2BAAAQFsCAACgLQEAAEBbAgAAoC0BAADQlgAAAGhLAAAA0JYAAABoSwAAALQlAAAA2hIAAAC0JQAAANoSAAAAbQkAAIC2BAAAAG0JAACAtgQAAEBbAgAAoC0BAABAWwIAAKAtAQAA0JYAAABoSwAAANCWAAAAaEsAAAC0JQAAANoSAAAAtCUAAADaEgAAAG0JAACAtgQAAABtCQAAgLYEAABAWwIAAKAtAQAAQFsCAACgLQEAANCWAAAAaEsAAADQlgAAAGhLAAAAtCUAAADaEgAAALQlAAAA2hIAAABtCQAAgLYEAAAAbQkAAIC2BAAAQFsCAACgLQEAAEBbAgAAoC0BAADQlgAAAGhLAAAA0JYAAABoSwAAALQlAAAA2hIAAAC0JQAAANoSAAAAbQkAAIC2BAAAAG0JAACAtgQAAEBbAgAAoC0BAABAWwIAAKAtAQAA0JYAAABoSwAAANCWAAAAaEsAAAC0JQAAANoSAAAAtCUAAADaEgAAAG0JAACAtgQAAABtCQAAgLYEAABAWwIAAKAtAQAAQFsCAACgLQEAANCWAAAAaEsAAADQlgAAAGhLAAAAtCUAAADaEgAAALQlAAAA2hIAAABtCQAAgLYEAAAAbQkAAIC2BAAAQFsCAACgLQEAAEBbAgAAoC0BAADQlgAAAGhLAAAA0JYAAABoSwAAALQlAAAA2hIAAABtCQAAANoSAAAAbQkAAIC2BAAAQFsCAACAtgQAAEBbAgAAoC0BAADQlgAAAKAtAQAA0JYAAABoSwAAALQlAAAAaEsAAAC0JQAAANoSAAAAbQkAAADaEgAAAG0JAACAtgQAAEBbAgAAgLYEAABAWwIAAKAtAQAA0JYAAACgLQEAANCWAAAAaEsAAAC0JQAAAGhLAAAAtCUAAADaEgAAAG0JAAAA2hIAAABtCQAAgLYEAABAWwIAAIC2BAAAQFsCAACgLQEAANCWAAAAoC0BAADQlgAAAGhLAAAAtCUAAABoSwAAALQlAAAA2hIAAABtCQAAANoSAAAAbQkAAIC2BAAAQFsCAACAtgQAAEBbAgAAoC0BAADQlgAAAKAtAQAA0JYAAABoSwAAALQlAAAAaEsAAAC0JQAAANoSAAAAbQkAAADaEgAAAG0JAACAtgQAAEBbAgAAgLYEAABAWwIAAKAtAQAA0JYAAACgLQEAANCWAAAAaEsAAAC0JQAAAGhLAAAAtCUAAADaEgAAAG0JAAAA2hIAAABtCQAAgLYEAABAWwIAAIC2BAAAQFsCAACgLQEAANCWAAAAoC0BAADQlgAAAGhLAAAAtCUAAABoSwAAALQlAAAA2hIAAABtCQAAANoSAAAAbQkAAIC2BAAAQFsCAACAtgQAAEBbAgAAoC0BAADQlgAAAKAtAQAA0JYAAABoSwAAALQlAAAAaEsAAAC0JQAAANoSAAAAbQkAAADaEgAAAG0JAACAtgQAAEBbAgAAgLYEAABAWwIAAKAtAQAA0JYAAACgLQEAANCWAAAAaEsAAAC0JQAAAGhLAAAAtCUAAADaEgAAAG0JAACAtgQAAABtCQAAgLYEAABAWwIAAKAtAQAAQFsCAACgLQEAANCWAAAAaEsAAADQlgAAAGhLAAAAtCUAAADaEgAAALQlAAAA2hIAAABtCQAAwF2NXQ92XZenC3Bz53kaAQDWcG8JAACAtgQAAEBbAgAAoC0BAADQlgAAAKAtAQAA0JYAAABoSwAAALQlAAAAaEsAAAC0JQAAANoSAAAAbQkAAADaEgAAAG0JAACAtgQAAEBbAgAAgLYEAABAWwIAAKAtAQAA0JYAAACgLQEAANCWAAAAaEsAAAC0JQAAAGhLAAAAtCUAAADaEgAAAG0JAAAA2hIAAABtCQAAgLYEAABAWwIAAIC2BAAAQFsCAADwadLWCgAAAMxwbwkAAIC2BAAAQFsCAACgLQEAANCWAAAAoC0BAADQlgAAAGhLAAAAtCUAAABoSwAAALQlAAAA2hIAAABtCQAAANoSAAAAbQkAAIC2BAAAQFsCAACAtgQAAEBbAgAAoC0BAADQlgAAAKAtAQAA0JYAAABoSwAAALQlAAAAaEsAAAC0JQAAANoSAAAAbQkAAADaEgAAAG0JAACAtgQAAEBbAgAAgLYEAABgtWGCBZIYAWC9tkYAAG3p9xsAnud7PQBYyTuxAAAAaEsAAAC0JQAAANoSAAAAbQkAAADaEgAAAG0JAACAtgQAAEBbAgAAgLYEAABAWwIAAKAtAQAA0JYAAACgLQEAANCWAAAAaEsAAAC0JQAAAGhLAAAAtCUAAADaEgAAAG0JAAAA2hIAAABtCQAAgLYEAABAWwIAAIC2BAAAQFsCAACgLQEAANCWAAAAoC0BAADQlgAAAGhLAAAAtCUAAABoSwAAAFYbJlgjiREAAIBtk6etFQAAAJjhnVgAAAC0JQAAANoSAAAAbQkAAIC2BAAAAG0JAACAtgQAAEBbAgAAoC0BAABAWwIAAPBKwwTA9pIY4Z7aGgEAtCWAxuB5vlMAgJW8EwsAAIC2BAAAQFsCAACgLQEAANCWAAAAoC0BAADQlgAAAGhLAAAAtCUAAABoSwAAALQlAAAA2hIAAABtCQAAANoSAAAAbQkAAIC2BAAAQFsCAACAtgQAAEBbAgAAoC0BAH7Yu/PAKMoE7+OVdHeuzn2fhBAIDUk4A4aAQRBMOERFgoDjiBBUJlEHj0FwGFQgnB5oIioBHERQgqgMcnhwKbAQCHIEgoSEJJ3OfXbuTtLvH89ubW13QHdmdvd19/v5q/qpp56qru5O+tf11PMAAMiWAAAAAACQLQEAAAAAZEsAAAAAANkSAAAAAEC2BAAAAACAbAkAAAAAIFsCAAAAAMiWAAAAAACyJQAAAAAAZEsAAAAAANkSAAAAAEC2BAAAAACQLQEAAAAAIFsCAAAAAP67qTkFAP4vsLGx4SQAAAD8F37dMpvNnAUAAAAAwD+CPrEAAAAAALIlAAAAAIBsCQAAAAAgWwIAAAAAyJYAAAAAAJAtAQAAAABkSwAAAAAA2RIAAAAAQLYEAAAAAIBsCQAAAAAgWwIAAAAAyJYAAAAAALIlAAAAAABkSwAAAAAA2RIAAAAAQLYEAAAAAJAtAQAAAAAgWwIAAAAAyJYAAAAAALIlAAAAAIBsCQAAAAAA2RIAAAAAQLYEAAAAAJAtAQAAAABkSwAAAAAAyJYAAAAAALIlAAAAAIBsCQAAAAAgWwIAAAAAQLYEAAAAAJAtAQAAAABkSwAAAAAA2RIAAAAAALIlAAAAAIBsCQAAAAAgWwIAAAAAyJYAAAAAAJAtAQAAAABkSwAAAAAA2RIAAAAAQLYEAAAAAIBsCQAAAAAgWwIAAAAAyJYAAAAAALIlAAAAAABkSwAAAAAA2RIAAAAAQLYEAAAAAJAtAQAAAAAgWwIAAAAAyJYAAAAAALIlAAAAAIBsCQAAAAAA2RIAAAAAQLYEAAAAAJAtAQAAAABkSwAAAAAAyJYAAAAAALIlAAAAAIBsCQAAAAAgWwIAAAAAQLYEAAAAAJAtAQAAAABkSwAAAAAA2RIAAAAAALIlAAAAAIBsCQAAAAAgWwIAAAAAyJYAAAAAAJAtAQAAAABkSwAAAAAA2RIAAAAAQLYEAAAAAIBsCQAAAAAgWwIAAAAAyJYAAAAAALIlAAAAAABkSwAAAAAA2RIAAAAAQLYEAAAAAJAtAQAAAAAgWwIAAAAAyJYAAAAAALIlAAAAAIBsCQAAAAAA2RIAAAAAQLYEAAAAAJAtAQAAAABkSwAAAAAAyJYAAAAAALIlAAAAAIBsCQAAAAAgWwIAAAAAQLYEAAAAAJAtAQAAAABkSwAAAAAA2RIAAAAAALIlAAAAAIBsCQAAAAAgWwIAAAAAyJYAAAAAAJAtAQAAAABkSwAAAAAA2RIAAAAAQLYEAAAAAIBsCQAAAAAgWwIAAAAAyJYAAAAAALIlAAAAAABkSwAAAAAA2RIAAAAAQLYEAAAAAJAtAQAAAAAgWwIAAAAAyJYAAAAAALIlAAAAAIBsCQAAAAAA2RIAAAAAQLYEAAAAAJAtAQAAAABkSwAAAAAAyJYAAAAAALIlAAAAAIBsCQAAAAAgWwIAAAAAQLYEAAAAAJAtAQAAAABkSwAAAAAA2RIAAAAAALIlAAAAAIBsCQAAAAAgWwIAAAAAyJYAAAAAALIlAAAAAABkSwAAAAAA2RIAAAAAQLYEAAAAAJAtAQAAAAAgWwIAAAAAyJYAAAAAALIlAAAAAIBsCQAAAAAA2RIAAAAAQLYEAAAAAJAtAQAAAABkSwAAAAAAyJYAAAAAALIlAAAAAIBsCQAAAAAgWwIAAAAAQLYEAAAAAJAtAQAAAABkSwAAAAAA2RIAAAAAALIlAAAAAIBsCQAAAAAgWwIAAAAAyJYAAAAAAJAtAQAAAABkSwAAAAAA2RIAAAAAQLYEAAAAAIBsCQAAAAAgWwIAAAAAyJYAAAAAALIlAAAAAABkSwAAAAAA2RIAAAAAQLYEAAAAAJAtAQAAAAAgWwIAAAAAyJYAAAAAALIlAAAAAIBsCQAAAAAA2RIAAAAAQLYEAAAAAJAtAQAAAABkSwAAAAAAyJYAAAAAALIlAAAAAIBsCQAAAAAgWwIAAAAAQLYEAAAAAJAtAQAAAABkSwAAAAAA2RIAAAAAALIlAAAAAIBsCQAAAAAgWwIAAAAAyJYAAAAAAJAtAQAAAABkSwAAAAAA2RIAAAAAQLYEAAAAAIBsCQAAAAAgWwIAAAAAyJYAAAAAALIlAAAAAABkSwAAAAAA2RIAAAAAQLYEAAAAAJAtAQAAAAAgWwIAAAAAyJYAAAAAALIlAAAAAIBsCQAAAAAA2RIAAAAAQLYEAAAAAJAtAQAAAABkSwAAAAAAyJYAAAAAALIlAAAAAIBsCQAAAAAgWwIAAAAAQLYEAAAAAJAtAQAAAABkSwAAAAAA2RIAAAAAALIlAAAAAIBsCQAAAAAgWwIAAAAAyJYAAAAAAJAtAQAAAABkSwAAAAAA2RIAAAAAQLYEAAAAAIBsCQAAAAAgWwIAAAAAyJYAAAAAALIlAAAAAABkSwAAAAAA2RIAAAAAQLYEAAAAAJAtAQAAAAAgWwIAAAAAyJYAAAAAALIlAAAAAIBsCQAAAAAA2RIAAAAAQLYEAAAAAJAtAQAAAABkSwAAAAAAyJYAAAAAALIlAAAAAIBsCQAAAAAgWwIAAAAAQLYEAAAAAJAtAQAAAABkSwAAAAAA2RIAAAAAALIlAAAAAIBsCQAAAAAgWwIAAAAAyJYAAAAAAJAtAQAAAABkSwAAAAAA2RIAAAAAQLYEAAAAAIBsCQAAAAAgWwIAAAAAyJYAAAAAALIlAAAAAIBsCQAAAAAA2RIAAAAAQLYEAAAAAJAtAQAAAABkSwAAAAAAyJYAAAAAALIlAAAAAIBsCQAAAAAgWwIAAAAAQLYEAAAAAJAtAQAAAABkSwAAAAAA2RIAAAAAALIlAAAAAIBs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6COx7eOPP367g9m6dau8iwMHDjg7O8urMjMzRfm8efMSEhIaGhrmz58vr73vvvvq6+uTk5Ot25wwYUJtba31WXryySdFhU2bNlmv/f777728vCRJGjduXFVVlXLVkSNHvL295fbT09NFeUpKiih59913RUlqaurdd99dVlZmNpuPHz/u5+cnSdKYMWMMBoPc2rPPPmtxwG+99ZZY9dxzz8mFo0aNKikpsT7ORYsWxcbGFhcXP//88xbtrF+/XtR54YUXrE/LiBEjCgsLzWbz2bNne/fuLZevWbPGYheLFy8Wq1avXn3u3Lk+ffpIkjR06NAbN268/PLLFs2uWrVKbLV06dLbvcorVqyQG7948aIcbyxERUVdvXrVbDZfvnx5wIABylUDBw68cuXK8uXLxYLc2quvvirX0el0ly5dMpvNV69ejYqKWrZs2e0+LytWrBCbvPLKK9evXx88eLByX3379s3JyZErr1q1SpS//PLLcmF+fv6wYcOUW4WFhWVnZ69Zs0YsKHdXUFAQExPz0ksvWRzGunXrLM7ACy+8IK8tKiq66667nn/++eLi4tjYWJG9T506ZTabS0pKRo0aZX0Cn3vuOb1eL34hsubv73/ixAm5/Y0bN4ry1NRUUfLOO+/IlX19fY8dO2Z96tLT0+U63t7eR44cMZvNVVVV48aNe/rppy0qb9q0Sa7s4eHx7bffvv/++8qs+80335jN5tra2gkTJixYsEDesK6ubuLEicnJyb/4p0+kR8HZ2fnAgQNbtmzRarVff/311q1bRfncuXNvt7kcdEU03bdvn3UdOUvfmUaj+eKLL3bs2KFWq/fu3atswWQyPfTQQ7NmzRIPd+7caWtru2fPHrPZ3NnZOX36dEmSbGxssrKy+F8G4O9Gn1gAAAAAwD+KbAkAAAAA+EdxvyWA/yWqqqqOHj1qZ2dXWloaHx9fW1vb2toqFsTtiAaDwcvLKzo6+vr16xY32l29evWnn36KiopS3tvp6ekZHR1dX18vb15TU3Ps2DFXV9d7771X1BkyZIhKperxeGpra48fP+7s7Czayc/Pb21tjY6Olivk5eWJlnU6nXznnoeHR3x8/NmzZ2tra0+cOOHq6irKrW85u379utjcyclJHE9zc/P58+ejoqJ6PJ76+voffvhBvnOypKTEzc0tOjra3t5elISEhMiV5VWBgYHZ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" />
          <div class="t m0 x1 h2 y1 ff1 fs0 fc0 sc0 ls1 wsc">Form I-90 02/27/17 N</div>
          <div class="t m0 x1c h9 y14e ff4 fs5 fc0 sc0 ls1 wsc">Preparer&apos;s Certification</div>
          <div class="t m0 x15 h2 y1 ff1 fs0 fc0 sc0 ls1 wsc">Page 6 of 7</div>
          <div class="t m0 xe h8 y14f ff1 fs1 fc0 sc0 ls1 wsc">I am not an attorney or accredited representative but </div>
          <div class="t m0 xe h8 y150 ff1 fs1 fc0 sc0 ls1 wsc">have prepared this application on behalf of the </div>
          <div class="t m0 xe h8 y151 ff1 fs1 fc0 sc0 ls1 wsc">applicant and with the applicant&apos;s consent.</div>
          <div class="t m0 x1 h3 y152 ff2 fs1 fc0 sc0 ls1">7.a.</div>
          <div class="t m0 x1 h3 y153 ff2 fs1 fc0 sc0 ls1">7.b.</div>
          <div class="t m0 xe h8 y154 ff1 fs1 fc0 sc0 ls1 wsc">preparation of this application.</div>
          <div class="t m0 xe h8 y155 ff1 fs1 fc0 sc0 ls1 wsc">I am an attorney or accredited representative and my </div>
          <div class="t m0 xe h8 y156 ff1 fs1 fc0 sc0 ls1 wsc">representation of the applicant in this case</div>
          <div class="t m0 x27 h13 y157 ff1 fs1 fc0 sc0 ls1 ws26">extends<span class="_"> </span><span class="wsc v0">does not extend beyond the </span></div>
          <div class="t m0 x1 h9 y158 ff4 fs5 fc0 sc0 ls1 wsc"> Preparer&apos;s Statement</div>
          <div class="t m0 xe h3 y6b ff2 fs1 fc0 sc0 ls1">NOTE:<span class="ff1 wsc">  If you are an attorney or accredited </span></div>
          <div class="t m0 xe h8 y159 ff1 fs1 fc0 sc0 ls1 wsc">representative whose representation extends beyond </div>
          <div class="t m0 xe h8 y15a ff1 fs1 fc0 sc0 ls1 wsc">preparation of this application, you may be obliged to </div>
          <div class="t m0 xe h8 y15b ff1 fs1 fc0 sc0 ls1 wsc">submit a completed Form G-28, Notice of Entry of </div>
          <div class="t m0 xe h8 y15c ff1 fs1 fc0 sc0 ls1 wsc">Appearance as Attorney or Accredited </div>
          <div class="t m0 xe h8 y15d ff1 fs1 fc0 sc0 ls1 wsc">Representative, with this application. </div>
          <div class="t m0 x1 h3 y15e ff2 fs1 fc0 sc0 ls1 wsc">8.a. <span class="_ _8"> </span><span class="ff1">Preparer&apos;s Signature (sign in ink)</span></div>
          <div class="t m0 x1 h3 y15f ff2 fs1 fc0 sc0 ls1 ws8" style="bottom: 236px; left: -64px;">
            8.b.<span class="_"> </span><span class="ff1 wsc">Date of Signature<span class="_ _23"> </span>(mm/dd/yyyy)</span>
          </div>
          <div class="t m0 x1 h8 y160 ff1 fs1 fc0 sc0 ls1 wsc">By my signature, I certify, under penalty of perjury, that I </div>
          <div class="t m0 x1 h8 y161 ff1 fs1 fc0 sc0 ls1 wsc">prepared this application at the request of the applicant. The </div>
          <div class="t m0 x1 h8 y162 ff1 fs1 fc0 sc0 ls1 wsc">applicant then reviewed this completed application and </div>
          <div class="t m0 x1 h8 y163 ff1 fs1 fc0 sc0 ls1 wsc">informed me that he or she understands all of the information </div>
          <div class="t m0 x1 h8 y164 ff1 fs1 fc0 sc0 ls1 wsc">contained in, and submitted with, his or her application, </div>
          <div class="t m0 x1 h3 y165 ff1 fs1 fc0 sc0 ls1 wsc">including the <span class="ff2">Applicant&apos;s Certification</span>, and that all of this </div>
          <div class="t m0 x1 h8 y166 ff1 fs1 fc0 sc0 ls1 wsc">information is complete, true, and correct. I completed this </div>
          <div class="t m0 x1 h8 y167 ff1 fs1 fc0 sc0 ls1 wsc">application based only on information that the applicant </div>
          <div class="t m0 x1 h8 y168 ff1 fs1 fc0 sc0 ls1 wsc">provided to me or authorized me to obtain or use.</div>
          <div class="t m0 x1c h9 y169 ff4 fs5 fc0 sc0 ls1 wsc">Preparer&apos;s Signature</div>
          <div class="t m0 x1c h7 y16a ff2 fs5 fc0 sc0 ls1 wsc">Part 7. Contact Information, Declaration, and </div>
          <div class="t m0 x1c h7 y16b ff2 fs5 fc0 sc0 ls1 wsc">Signature of the Person Preparing this </div>
          <div class="t m0 x1c h7 y16c ff2 fs5 fc0 sc0 ls1 wsc">Application, if Other Than the Applicant </div>
          <div class="t m0 x1c h11 y16d ff1 fs5 fc0 sc0 ls1">(continued)</div>
        </div>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 78px; left: 62px; ">@PreparerInformation.IsStatement1 </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 123px; left: 62px; ">@PreparerInformation.IsStatement2 </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 207px; left: 80px; ">@PreparerInformation.PreparerSignature </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="bottom: 182px; left: 212px; ">@PreparerInformation.SignatureDate </p>
        <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
      </div>
      <div id="pf7" class="pf w0 h0" data-page-no="7">
        <div class="pc pc7 w0 h0">
          <img class="bi x0 y0 w1 h1" alt="" src="data:image/png;base64,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siUAAADIlgAAAMiWAAAA/Jgl/lTfWIsWLXy6AADA/1VisdhP9a25bwkAAIBsCQAAwP+0Fj/he7IAAADsG+5bAgAAIFsCAAAgWwIAACBbAgAAIFsCAACAbAkAAIBsCQAAgGwJAACAbAkAAACyJQAAALIlAAAAsiUAAAD/yhI1AfDfZfHixdOmTYvFYv9M5aFDh+bn5yckJHz88cfTpk279NJLk5KSpk2bdskllxx99NFBEEyfPr2+vr6goCAx8f/7TbVs2bLCwsLGxsbmOzz00EMLCgpatWr1ySefFBYWXnTRRR06dCgsLLzwwguPPfbYIAgeffTRDz74YK8nM378+OOOOy5cXrFixbRp0+rq6sKX48aNGzFiRBAEM2fO3Lp1a0FBwezZs999991w7UEHHZSfn//ss8++8847TfY5cODAgoKC9u3bNyn/93//93/84x9BEFx44YUnnnhik7VffvllYWHh9u3bBwwYUFBQkJycHL9q2rRpNTU14cvzzz//5JNPDoLgL3/5y1tvvRUEwXnnnTdy5MggCJ566qni4uL8/PzU1NSVK1dOmzaturr6gAMOKCgoSE1NDTd/+umn33jjjfhDn3vuuaNGjQqC4Jlnnnn99dfDwr59+xYUFKSlpTU5z9mzZ69evTo/P//1119/7bXX4ledffbZp512WhAEc+bMefXVV5ts2KdPn/z8/C5duqxdu3batGnl5eVheV5e3ujRo+Nrzp079+WXXw5XDRw4cNq0aWVlZdnZ2QUFBe+++264KjJmzJhf/OIXQRA899xzL7300l4/5TPPPPOXv/xluFxcXDxt2rSNGzc2r5aVlVVQUNC9e/eSkpLCwsLS0tJoVY8ePfLz85csWbJ48eL8/PysrKyw/IUXXnjhhRfC5e7du+fn5/fs2bO0tLSwsPCwww4788wz93o+L7744t/+9rcgCH7xi18ce+yxhYWFxcXF0dquXbsWFBRkZ2eHL1966aXnnnsuCILRo0fn5eWFhZs3b542bdq3334bbdWlS5eCgoIvvvjiH//4R0FBQe/evaNV5eXlhYWFAwYMOPvss+NP45VXXnn22WfjS0499dSxY8eGy1u2bCksLOzXr9+oUaOmTZu2evXqtLS0goKCvn37VlZWFhYWrl69usn7GjVq1Kmnnjpt2rRVq1Y1f9epqan5+fn9+/cPX77xxhtPP/10EAQjR44877zzgiB48803n3rqqXBtx44dCwoKcnJymuzkrbfe+stf/hIuJycn5+fnH3jggTU1NYWFhZmZmRdeeGF85fnz58+aNStcbt++fUFBwebNm+NL8vPzBw0aVFtbW1hY2KVLl4svvjhcVVtbO23atPT09Kjku7z77ruPP/54uNymTZv8/Pzq6uqnnnqqoKCgurp65syZQRAMHz78kksu2evmH3zwwaOPPhouJyUlFRQUDB48uEmdDz/8cMaMGf/xt7rExPz8/Pr6+sceeyw/P3/o0KHRqt27d0+bNi0xMfG3v/1tEAQLFiyYMWNGfn7+4YcfvmfPnsLCwo8//rhFixb5+flHHHGE/86A/6IYwH+TefPmtWjR4p/85XPGGWfs2rUrFos9//zziYmJzzzzTLjw9NNPh3s755xzfvnLX9bX18cf4u9//3urVq32usPRo0fv2LEjFou99NJLbdq0mTVr1v/6X/+rbdu2s2bNCre94IILvutknnjiiegQr7zySocOHaJVM2fODMsvvvjiUaNGVVdXjxs3Llr7s5/9rKqqavz48c33efLJJ1dWVjZvpUsvvTSsMH369OZr33777c6dOwdBcMIJJ5SXl8evmj9/fnp6erT/wsLCsDw/Pz8seeihh8KSgoKC4cOHb9y4MRaLvfvuu127dg2C4Nhjjy0tLY32dsUVVzQ54T//+c/hqiuvvDIqPOqoo9avX9/8PK+++uphw4YVFxdfc801TfZzzz33hHWuvfba5s1y+OGHr1u3LhaLLV68eL/99ovK77rrriaHuOGGG8JVd95558cff9ynT58gCAYPHrxq1aqJEyc22e0dd9wRbjVp0qTv+pRvv/32aOcrVqyI4k0TgwYN+vLLL2Ox2GeffTZgwID4VQceeODnn39+6623hgvR3v7whz9EdXJycj799NNYLPbll18OGjRo8uTJ3/Xzcvvtt4eb3HTTTV9//fUhhxwSf6y+ffsuW7YsqnzHHXeE5RMnTowKV69ePWTIkPitevfuvWTJkrvuuitciD/c2rVrhw4d+vvf/77Jafzbv/1bkxa49tpro7VFRUVHHnnkNddcU1xcPGzYsDB7f/TRR7FYbP369UcddVTzBrzyyitLSkrCvxA1161bt/feey/a/wMPPBCWFxQUhCUPPvhgVDkjI+Odd95p3nSFhYVRnfT09Pnz58disfLy8hNOOOGyyy5rUnn69OlR5U6dOr355puPPPJIfNZ94403YrFYZWXlySeffMkll0Qbbt26deTIkePHj/8Pf/WF6THUoUOHV1555fHHH2/fvv3//t//+4knngjLL7zwwu/aPAq6YTR96aWXmteJsvT3S0pKeuGFF55++unExMTnn38+fg+7du0644wzzj777PDl7NmzW7Zs+dxzz8ViscbGxl//+tdBELRo0WLevHn+LwP+y/SJBQAA4IfSJxb4iVixYkXYyTY1NfX+++9fuXJlY2Pjfffdt3LlyrAr2kcffTRo0KAJEybMnj17wYIF8dvOmjVr27ZtEyZMaNOmTVQ4cODACRMmrF69Otz8gw8+2LFjxxVXXNGvX7+oA1uPHj3atm271/P58ssvr7zyytatWw8YMGDChAnPP/98eXn5hAkTogpPP/10bW3thAkT4m+T9u/f/7777quvr9+2bdvkyZMbGxv79+8/YcKE5OTkcNUTTzwR9r+dPXv28uXLgyDIzs4Oz+fbb7+95557wkOsWrXquuuua9u2bXJy8uTJk1u1atWtW7eUlJRw1YwZM9LT06+//voZM2ZUV1eHh/7rX//6xRdfBEGwYMGC/ffff8KECampqTU1NVOnTt21a1d0hn369AkPsXbt2htuuCEnJyc8+rx581avXj1hwoSf/exnYc0xY8ZE9wbXrVs3Y8aMysrKdevW3XjjjR06dGjfvv21117bunXrsML69ev/+Mc/TpgwoUuXLs0bs1evXnfccUdNTU3nzp3DCj179pwwYUJGRkZYIer796tf/Sq8HfrCCy8075G7fv36GTNmDBs2rFevXv/hFdW9e/fbbrutqqoqKtmxY8eMGTPS0tIuvfTSGTNm7Ny5MzMzM2yNbt26TZgwoUePHqmpqT169Ig2efnll/fa8zbc/5QpU/ba0fHUU0899dRTZ82a9fDDD4cly5cv79Kly4QJE37+859/zzlXVFTccccdGzZsCBfS09PT09MvvfTSr7/+etasWd9+++3rr7++devWIAh+9rOf5ebmhgthT+k33nhj/vz54U/BDTfcMGHChPBecahTp04TJ04sKytr3759nz593njjjb///e9jxozJysqaN29e/Dm89dZbDQ0NZ555ZpO+qaG2bdv27dv37bfffvXVV+N/HCInnHBCeEXNnz9//vz54cKcOXOa/HBFyzU1NX/6059KS0vDHt3vvvtu1PW0ffv2TQ5RW1t73333bdu2rclB33vvvZkzZ3755Zfr168PNx8+fPhZZ5111VVXffLJJ9EO27ZtO2HChIEDB+7cuXPGjBlffPFFmzZtmhyirq7ugQce2LFjR/O3Vl9fP2PGjOTk5IsuuigqefTRR0tLS6NfKQkJCQcffLDf58CPlVu3wE+jT2wk7Bx7/vnnn3766bW1teeff3606rTTTtu+ffteO8eeeuqpNTU18X1iTznllG3btjUfavXYY481eeN77RMbCTvHXnrppSeddNKWLVuiPrFBEJx44okVFRV7bcyoc+zxxx9fVlYWlYdjpeJFXWHz8/OPO+64TZs2FRQURGujzrGR9957r1u3bvfff//777+fmZm513M++uijS0pKYrHYhx9+GJ+UgiAIu8JeffXV4cs//elP4W6vueaaI488sqioaK9vZ9GiRdHQwSgNrl27Nqpw/fXXH3bYYWvWrNlrn9gme5s4cWLYOfZ7rsbmnWNvv/325cuXH3DAAVOmTPln+sQ29/nnnx944IG33npruBAEwYABAz777LM//OEP4UJ85bBP7PdcGDfddNPKlSsPPvjg5n1iJ02a9M033xx66KHx9ffff/+lS5fGH6J5n9jm9ttvv8WLF999991Nyq+77rom7+6ee+7p1avXwoUL77nnnp49ey5YsCC+T2yTyvfee2+PHj0+/PDD++67b6+x+YMPPvieT+eBBx4IO8c27xMbeeihh8I+sQ899NB/+Pvk8ssvD/vExhempaW99dZb8X1imwv7xDZP+FFX2Cj1BUHQsWPH1157LRaLVVdXh1E2OTn51Vdfje8TG2neJ3b79u2nnXbaBRdcEL3H2tra008//fzzz/8Pf7vqEwvoEwsAAMC/BNkSAACAH8p4S+DH54ADDkhISFi5cmUsFktLS8vJyVm9enVjY2NOTk7Lli0PPPDAli1bHnDAAdXV1eFCOAfJN998U1lZ+dFHH23evDnaVadOnXJychISEgYOHNiy5V7+3NavX79w8yAItm7dunLlylWrVr3//vvxm/ft23fgwIErV67cvXt3ampqTk7OunXroqNs3bp1wYIF7du3HzRoUPx8KkEQVFVVLVy4cMiQIVHf1KqqqpUrV+7ateuzzz6LH+W4evXqHTt2NHls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797RVjt37pwzZ86qVavCl0OHDj3zzDPDhVtuuSV+VRAE9fX1s2bNeu+99xoaGr755psNGzbccccdw4YNa9eu3d/+9rcmDZWUlDR27NjwuVBBECxbtuy5554Ll3ft2vWXv/zlo48+SkxMPOecc/b6+C4A2RLgv83LL7/cokWLuXPntmnT5qWXXsrLy3v00Uc7deqUl5fXPODl5OSE2XL06NEtWrR47rnn4rPl2rVr77333iAITj311DFjxnxPtnzllVc2bNgwd+7c+IFzr7/+el5e3vc8vjK+ZmNj4xlnnBFfuN9++1111VU33XTThx9+eMYZZ4Tftq+66qrv2c+oUaPCSduDIHjnnXdefPHF/1q2HDly5JVXXhlfctVVVy1ZsmTu3LlNxpsFQXDyySe3a9cuLy9vw4YNw4YNGz16dBAEpaWl06ZN692793dly3/84x9R9BoxYkReXl7881SHDh06d+7c6Kt8VVVVbW3t5ZdfHj1rNN6mTZseeeSR+GeNduvW7bLLLose5hkEwSeffJKXl7d69erw5R//+Mdx48YFQTBixIgRI0aEhStWrHj00Ud/85vf/PKXvwxLysvLH3vssaysrIyMjMcee2zlypWDBg2aO3fuf+o7/bHHHhv/iKZ4H3744YcffhgEwc0333zppZe+9dZbUbY85phjJkyYEAX7J554YsWKFf369TvppJOOOeaYJsn/eyxcuHDhwoXhcu/evU844YQgCFJTUy+66KKhQ4d+11bDhg3r1q1bXl5efX19k2y5ePHijRs3jhgxIj5b1tTUPPXUU0EQhNFxr9ly+/btTz311OGHHz569Ojzzz8/vEjy8vI+/PDDzMzM8847r8mzauMNHTo0eupSaOnSpQ899FAQBOvXr1+/fv3cuXPD51p9+OGHzbPlCSecUFFRkZeX179//+nTpzfZeV1d3Zw5c+J/iK6++uoFCxasWbOmvr7+2Wef3esphavefPPN8OW4cePCbHnooYf26dNn0aJF8dly165dc+fOjd987dq1c+fO7dmz516zZV5e3umnnx6+fPLJJ6NsuXv37nC5TZs2RxxxhGwJ/LjoEwsAAMAP5b4l8K+oX79+ubm58VNB9uvXL5zUJLJq1aqpU6dGdzJ79uzZs2fPe++9N+oT+/Of/3z//fefOHHic889t2zZsiaH6NOnT25ubvxDKfv06RP/bMzTTz996NChDz744Mcff7xly5a77747mmXx9NNPP/zww8PldevWzZs3LyMjIyMjo7CwML5H7rfffltbW3vqqaceccQRQRCE/zZRVFT0pz/9qUOHDkVFRTU1NUEQ9OrVKzc3N+ok+eqrry5atCgIgoULFyYkJISFxcXF8+bNq6mpycrKys3NXbBgwYIFC8aPHx8EQVZWVpM7t+FugyAoKSmprq4eOXJk2Kv2jTfeKC4uzs3Nje9k271799zc3CVLlqxbt+7+++/v1KlTWHLyySfvv//+0SN5m8jMzLziiiu2bt26cePGefPmDRky5Nhjj33qqafiW2Pjxo1Nnq8bhHRTmQAAGFVJREFUVq6srIxKYrHY2LFj47vdZmRk5ObmRjc2gyDYvHlzYWFhbm7ugAEDwml1br311mjt3Llz33333San98477/zhD38Il9PT03Nzc5v3j3333Xdbtmz561//OpzsIfTQQw/l5uZ+/fXXzz33XPgI3y1btjzyyCPdunVLS0vLzc3NzMzcsmXLvHnzNm3aVFlZ2fzxpE1s3br10UcfzczMvPLKK7t37x6Vf/DBBx9//HFubu66deveeuutqDXCO5bhyX/00UcpKSm5ubk9evRISUmJ+tOGOnbsmJubG376WVlZH3300XPPPbd+/fphw4aFN9KjOUIWLlwYtUZNTU1xcfGRRx6Zm5sbfxd04cKFH3zwQW5ublSyaNGiaKvo9K677rrw4s/NzQ27y7Zv3/7CCy88/vjjm7R/bW3tiSeeeMEFF6xbty7cz9ChQ8Mb7P+kNm3a5Obm/vznPw9fLl26dN68efGzUy5btuzOO+/Mzc2trq5+6aWXhg0bNmzYsNatW/ft23fDhg3/zCEaGhrmzZv397//vaGh4ZlnnlmyZEliYmJubu4hhxwyadKkefPmxd8IBZAtAX402XLSpElNphZoYs2aNXfddVf0cubMmT169MjLy4uiVFZW1vjx42+88ca1a9fuNVvecMMN3xWWgiAYPXp0v3798vLywvBzzz33RKu6du0aZctvv/32nnvuue222wYMGJCXl1dRUdFkP6eddlr8hJZNFBcXh51+I7169br22mujsXyvvfbagw8+GC5HIXD9+vX33XdfaWnpUUcddcopp7z++uuLFi2aO3duk7wRBMGbb74ZdRoM/exnPwvncty+ffvu3buvuuqq7OzsxYsXh2t79Ohx1VVXPfzwwx999FF43KFDh44cOXLkyJHf81l079497MG7bNmyt99+Oxx6l5eXF//Vv7kwJcZ/Xz/44IPnzp3bv3//Tz/9NGrqgoKCnJyczz77LCwpLy9/+OGHMzIy0tPTH3744bPOOivKll988UVeXt6XX37Z5EDvvffee++9Fy7n5OSMGDGiebZ8//33y8rK5s6de/DBB4clf/zjHwsLC4877rj333+/sLAwLKysrJwxY0YQBH379h0+fHhmZmZYsnz58n/mwq6qqnrssceuv/76Jh2eP/roo+nTpx9zzDEfffTRbbfdFhZmZ2eHUfn666+Pro3x48c3H5wZZstx48YdddRR4ct58+b9+c9/DoJgzJgxUSYMI9aiRYvCv1ZEzjjjjGuvvTa+ZPHixffee2/8gZYsWbJkyZL4Ovn5+ZMnT168ePFBBx30+9//PiwMs2V8tfLy8ry8vPLy8tGjR19wwQXTp08P54C97LLL/rPZ8rzzzouuw2XLlt19993xFT755JM1a9YMGTJk/fr1f/7zn+fOnXvKKadEfzj4Zw6xa9eu2bNnv/LKK0EQhH1027Zte+ihh44ePfqAAw5YsWKFbAn82OkTCwAAgGwJAADA/zR9YoEfpdra2nXr1rVu3XrTpk3xM1sEQdCuXbuMjIyKiort27cHQVBWVhY9X3TTpk179uxJT0/v2rVrOFRvx44dmzdvjsVi4VbRlBjp6ekJCQllZWXRzsPZKcLNk5OTgyAI/w0rR887TUlJKS4ubtWqVbdu3cK97dixo6ysLC0tLX6Y4verqKgoLS3t2rVrQkJCmzZtevXq1dDQUFpaunv37qhO586dW7VqtXnz5oqKivANdu7cOSUlJVzbpk2bjIyMhISEurq6srKy+A3/Q1u2bCktLW1sbAyCoK6urri4OCEhoXv37tFozHhpaWnRQUONjY3h+VRVVX3XIdLS0rp3715WVtbY2FhfX19cXBy1c1paWmpqarjcqlWrjIyM3bt3R59geXl5t27dUlJSWrVqlZWVtWfPnoaGhs2bNzc2NoaVt2/fHh63srKypKQk/pnAnTp16tGjR/wg2++xdevWkpKShoaG5qtSU1O/p6tzRkZGWVlZNMgzvnLXrl3jr8bKysqGhoaSkpI9e/ZE18+uXbvKysrij5uYmNijR4+ioqKtW7d+5//liYkZGRnR2OCWLVvGP1M3/Ex37dq1YcOGaEhqSkpKz5499/pg5Kqqqm3btmVkZMSPFo7/fKOZYIIgqK6ujo5VUVGRlpYWP43H7t27w+fiNjY2lpWV1dXVJSQkZGRkdOzYsVevXk32H65qaGgId15dXV1UVLRz5874Q4R12rZtG+65rq6uqqoqNTU1mo0mOTk5PIFWrVp9++23Yefkli1bhltFP7BN3lRycnJ2dnb8cOiwpKysLDExMaxfU1NTV1e3cePG8vLy77lyWrRoEV608TMJhZuvW7dux44d8YV79uzZtGlTWVlZcnJy165de/fuHYvFysrKWrZsmZWVFQ3ABpAtAf5/tGzZsvPOO69ly5ZVVVXx+SEIgiFDhkydOvWuu+4KxzVNnz593rx50ZfmhoaGyy+//Nxzzw2/VX/yySeTJk3auXPn0UcfPXXq1OjL3IQJE9LT08NVYcmMGTNatWq1c+fOK6+8MpzBIpqL79JLL40mF/nqq69+97vf/epXvzr11FPD8ZyfffbZpEmT8vPz4x/i8v0ef/zx0tLSO++8MzU1deDAgY899tgzzzzzyCOPREM9gyC46KKL+vTpM2nSpH//938P3+l1112Xl5cXrs3JyZk6dWrnzp3DNxj/PJv/0JNPPjlz5swwyXzzzTe//e1vzz777Isvvjh+MsnIb37zm3PPPTe+5IUXXjj77LODIFi/fn3841vinXPOOd26dZs0adLGjRvXrFlzxRVXRCGnoKAgnL4iCILevXtPnTp16dKl4Q6DIMjKyrrxxhsHDx6ckpLywAMP1NfXf/3115MmTSopKcnOzr7zzjtffvnlWbNmBUHw17/+9fXXX49/+E1eXl5BQcE/OWnkvHnz3n777b0+o2XMmDGXXHLJd224adOmBx988LTTTgufGPTrX/86mmhk06ZNhYWFpaWl4cvS0tKKioobbrjhjDPOiKbBKC4unjRpUvy4u8zMzLvuuuvhhx9uPrVGfKC98847o/kS33zzzajFQmEiuummm6L5ckaPHn3dddftv//+zff28ssv//Wvf506depBBx201z89TJ48OXog0CuvvPL5559HefXiiy+O32d5efmkSZPCrH7rrbeuWLGic+fOU6dOPeWUUw455JC+ffsuWLAgqpySknLrrbeuWrUqHCH8xhtvfP7552vWrCkqKvr666+jPxBMnTr1sMMO27Zt2+2337506dIOHTpcfPHF0ewmI0eOPOCAA4IgeP/998ePH3/nnXcGQdChQ4ebb745GsPcpUuXJm/qxBNPnDx5cvyUNieeeOLjjz8+adKkbt263XTTTUEQvPjii3fdddedd9651784RNq0aTNx4sSKior7778/vvzdd9+98MILozlyQg0NDf/2b/9WUlIyefLkG264YcKECfX19ZMmTUpOTp4yZcpePx0A2RLgv1lVVdXSpUv3uio1NXXo0KHRrYl169bFz4YXBEGfPn369+8fLldXVy9durS2tjY9PX3Pnj3xdTIzM+Pv1H377bdR4GnyRNbevXvHz9O4YsWKc889N/qiv23btmXLln3/vY4mwi/T4Z3Djh07DhkyZObMmdHX69B+++03YMCApKSk4uLi4uLiIAjKysqitcnJyYMHD+7WrVtdXd0/eacuUlxc/NVXX4XLtbW1K1asuOCCCw488MC9Vu7Vq1eT1pg7d270UJbvypa9evUaOHBgmCd37NgRPVknTEHRcvv27Q855JDFixdHO2xsbOzfv3/4BNRDDjkkCIKkpKTw9lf79u0PPvjg6KFKGzZsaJIMs7KyBg0a9E82QmlpaRQCm+jRo8deH8kb/XFh7dq10aHjK69cuXLt2rXRQ4NCX3zxxa9+9auoTmpqapO7VW3atBk0aFDzpyg1qTNw4MBwHtcgCP7xj380eS5OKP4pRJmZmYceeuh3xeMVK1Z817ypDQ0NX3311fr168OXmzdvjmbs7N69e5ProbS0NLy9v2vXrq+++mrJkiXdunXbvn17t27dunXr1mTPSUlJAwYMiJJbWVlZeEnX1NRE13aXLl3Cv7A0NjauXLlyyZIl6enpPXr0iP7Q07Vr1/Be5dKlSz/55JMwSycmJubk5MSfWJO/tmRkZEStF1+SkpKSkZERbvjpp5/u2bPnm2++CeL6LDSXkJDQv3//5p0UKioqmj+IKxaLrVq1at26dQkJCWEk3rlzZ3iv+3vmJgWQLQH+f9GmTZu0tLS6urra2trMzMz6+vq0tLTvypwtW7bcunXr1q1bo6/+FRUV8ZEysnXr1qSkpD179kTf9auqqnbv3p2WltbQ0BBunpqaGj1ptq6urrKyMhaLhTvcunVr2D+wZcuWrVu3zszMbN69raqqqqamJiMjo66uLuop16pVq3Cr5OTkzZs319fXhyUpKSnxU0qEX9bDjotRdIx/7G19ff3GjRt3795dXl6+e/fulJSUaG3Hjh3Lysqidx32HA6CICUlJT09PeoVHJ1Pp06dGhsby8vL09LS4sN2UlJSWlpahw4dopTepPE7duzYpUuXcJOkpKSuXbvu2rUrLKmurq6qqkpPT29+CyjaYRhjNm3aFH+3tsmxEhMTmx/rP2XXrl2bN29OTk6urKwMe+o2NjZWVlY2NjYmJiampaXFYrHw405OTg67njbPFdu2bYtOcsuWLZ06dYrqbNu2Ldr8n/pfOTGxS5cuycnJYSfS6ELds2dPeAG0aNEiLIwaqkOHDl27dg0vg/Dk9+zZ07Vr18rKyvhb+gkJCWlpadHV0rFjx7BydXV1848g2mEkvJY2bNhQXl7esWPH7t277969e+vWrfGfYFgn7KQav+327dvLysrCrTp37hx++k3qRJvv2rUrutT37NlTWVmZlJQU9bsOu4IHQdCyZcv09PTu3bunpqZu27atqqoq/BCj84nvkr1nz56KiooNGza0aNEiLS1t9+7dGzdurKuriyrU1taWlpaGq6INq6urw18sYYM3NDSEJ7Zjx45du3bF7zD8XNLS0lq3bt2uXbvt27fX19dnZmbutctxWLlTp05Rl+DU1NTwl0ZdXV1dXd3OnTtbt24dHrRt27bf9QsNQLYE+G82ZMiQKVOmvPjiizt37pw5c2YYeJrMVBm6/PLLU1NTb7nllunTpz///PNhYWVlZX19ffPKYQ/Yurq63/3ud6effnoQBHfddVdFRcVtt932+uuvhx0Or7/++mg2vE8//fSWW26pra3dunXrjh07Zs6cuWnTpilTpiQnJx900EGPP/54dF8lMnPmzGOOOeb+++9/+OGHX3rppbBw4MCBU6ZMSUlJWbNmzTXXXLNjx47Bgwffdttt48aNC6cijLz44ovLli275557oowR34Nu5cqVl112WatWraqrq6urqy+//PIxY8aEq7799tuJEydGkTIayXb++eePGzeuyRfZfv36TZkyZfHixZMnT54yZUpGRkaTVdE0Ek899dRnn302ZcqUqMJvfvObSy65JLyB3Ldv34ceeqi+vj45OblLly5PPPHEe++9N3ny5OYDF+Mbat26dVdddVU48WO8OXPmLF68eMqUKdHdvLPOOuuyyy77J/u7xisuLr7mmmvatWvXtWvXa665JiMjY+3atbfccktxcXFWVtaUKVNWr14dftwXXXTRWWed9ac//an5aL2//e1vTzzxRLjcpUuX3/3ud0cccUT494Lnn38+vMF+wQUXRP02v0dmZubdd989ffr0p59+euLEidGHO2LEiLDf7DvvvBOez7nnnhtOmPGLX/ziqquuCu+cl5WV3XLLLV27dn3ggQduueWW8CZbdGJTpkyJbqdnZWWVl5ffcsstUe/WyOjRo4cMGdKvX7/4wrArbMeOHTt27Hj++ef36tUr3PyLL76I/4vMrbfeOm7cuCuuuCJ+29dee23jxo1jx4698cYba2pqZs+evXr16quuuqr5nwxuu+22UaNGRT2Et27desstt/Tp0+fqq6+O/qIRvoWOHTtOnjy5urq6trY23OG4ceNuv/32Tz75JKwZfwN8+/btf/zjH1NTU8O+phs2bLjrrruim/NBELz99tvjxo2bMmXKxo0bo9mAwluj33zzTdjgQ4cODU/s5Zdfvvfee++6664ZM2a0a9cuvObbtGlzww03DBs2rL6+fs6cOcnJyU8++WROTk7Yp6CJVq1a3XDDDdGELuEo07vvvnvBggV79uz56quvkpKSwoOOGjXq5ptv9nsekC0B9oXOnTsfc8wxTz755NatW4866qj4p3E0ccABB4S3tlatWvUfziMXVejXr9/w4cODIJg1a9bu3buPPvro55577oMPPgjTQlS/qqpq4cKF0S2g1atXf/7552Gn1k6dOkVfIuOtWbMmOzt76NCh8YkoNTV12LBh6enpu3btWrp06ZYtWxITExsbG/v27Rs/GCwIgmeffba4uPiwww6Lz3uRbdu2RVNKhrEzfBeh5cuXNw9sffr0CXuZxuvYseMRRxzx/vvvf/rpp03uMYaronS3bt26FStWxAf13r17R70uk5OT43skfvvtt2vWrDnooIPin/vSXG1t7ccff9y8vKioaPny5fH3nfbbb78hQ4b8F66fHTt2hN1oBw0adOCBBw4YMCC6U92+ffvDDjts9erV4cd90kknhSV7DahhnSAIcnJycnJysrOzw+iyfv36sPvo8ccf/89ky7Zt2w4ZMmS//farq6uLn9Ny+PDh4Sf4wQcfhMeK9tazZ89oJGG41UknnXT44Yc3uVPapk2bQw89NKoZfgorVqyIOntHsrKymnfBbWhoCLsuZ2Vl3XzzzUcddVRJSUmTnp9hnSaPEQqCoLS0NBaLTZo06dhjj924ceOdd96513txu3bt+uyzz0aMGBFdq5s3bw7v2MdfvVHIDGcKLS8vv/vuuzt06NDY2Pj5559HH0QQBNFRwlXhD2NVVdWmTZsWLlwYv7fNmzcvXLgwXBW/h2htEAT9+/cPT+Prr7/evXt3GKqTk5PDkckJCQmDBg0aPnx4TU3Nvffem5mZGc0W21xCQsLAgQPj39SOHTu+/PLL+EOH3YC//wcE4P825iABAABAtgQAAOB/mj6xwH+b3r17jx8/vslsk99l8ODB4QyT2dnZ48aN23///ZOSksKFsMIJJ5xQX1/f5NEy2dnZF198cdjXNHTIIYckJCSMGDFix44d8Y9yGTFiRJNRl/369UtOTr7wwgv3OoXAoEGDwgfDZGVlXXDBBVHfzuiJssOHD6+qqkpKSho+fHh45tGqIAh69Ohx/vnnx89oN2DAgL0O+/x/2rubllSiMA7gDmXajGRqUWhlYGTiohcyh3AZFNgbvW0iWtgnuov7GfsAbdrdxYFh0Fvcy11d+P1WwznjqONZ+IfnPDMajbI+Ont7e6VSaTQaZc+fDCOFQqHZbL68vHx8fHS73d8+ZvD09HR7e/urqXy9aKFQ6Pf72fH6+vrz8/NsB5esh2qaplmP0E6nkyRJmqZra2v5XkFpmq6uruZHhsNho9FIkmQ4HL69vRUKhd8+wSI4OTmpVqvft7cZDAbhOnlbW1tLS0uDwSCO41CQ2Wg0np6esuLb4+Pj2VcF+bao9Xr98fExXxjcarVCd5larfbw8PD+/h76xBwdHYULflNzm50Tbm/YRLq8vHx/f5+maRgPTUfv7u6yHaqZ2Y6gBwcHU98iO2d/fz9MharX29vbfAvfMNLr9cLB4eFhNrWysjK1U7RSqdzc3OQLoev1+tTzOZIkub6+zv+UtVotlGGHqfzSytZGdhzH8dXVVa/Xq1aroX3r4uLi5eVl1kC43+9PfdN8KWk4udVqfbNOyuXyeDwOjXPG43F+13GSJM1mc35+PnuLOI6bzWaxWJxdJHEct1qtUqn01frJipC73W52Trlc3tjYqFQqr6+voZC4WCxeXFxkzYd2d3dnL7iwsLC5uZkfmZubOz8/n90wnN3MnZ2drz7Y1HXa7fbn5+dkMmm32/mpKIrOzs6y9ledTmcymYTtzWGqXq9HUaQKF/gX0R/+CwQAAICvqIkFAABAtgQAAEC2BAAAQLYEAABAtgQAAADZEgAAANkSAAAA2RIAAADZEgAAAGRLAAAAZEsAAABkSwAAAGRLAAAAkC0BAACQLQEAAJAtAQAAkC0BAABAtgQAAEC2BAAAQLYEAABAtgQAAADZEgAAANkSAAAA2RIAAADZEgAAAGRLAAAAZEsAAAD+62z54+dWFEVR5JYAAADwl34BlI+PIJHRWC8AAAAASUVORK5CYII=" />
          <div class="t m0 x1 h2 y1 ff1 fs0 fc0 sc0 ls1 wsc">Form I-90 02/27/17 N</div>
          <div class="t m0 x1 h3 y16e ff2 fs1 fc0 sc0 ls1">3.d.</div>
          <div class="t m0 x10 h14 y16f ff2 fs1 fc0 sc0 ls1 ws0" style="left: 217px; top: 233px;">
            6.a.<span class="_"> </span><span class="ff1 wsc v0">Page Number<span class="_ _24"> </span><span class="ff2 ws8">6.b.<span class="_"> </span></span>Part Number<span class="_ _25"> </span><span class="ff2 ws9">6.c.<span class="_"> </span></span>Item Number</span>
          </div>
          <div class="t m0 x10 h3 y170 ff2 fs1 fc0 sc0 ls1">6.d.</div>
          <div class="t m0 x10 h3 y171 ff2 fs1 fc0 sc0 ls1">5.d.</div>
          <div class="t m0 x3 h7 y49 ff2 fs5 fc0 sc0 ls1 wsc">Part 8. Additional Information </div>
          <div class="t m0 x1 h8 y172 ff1 fs1 fc0 sc0 ls1 wsc">If you need extra space to provide any additional information </div>
          <div class="t m0 x1 h8 y173 ff1 fs1 fc0 sc0 ls1 wsc">within this application, use the space below. If you need more </div>
          <div class="t m0 x1 h8 y174 ff1 fs1 fc0 sc0 ls1 wsc">space than what is provided, you may make copies of this page </div>
          <div class="t m0 x1 h8 y175 ff1 fs1 fc0 sc0 ls1 wsc">to complete and file with this application or attach a separate </div>
          <div class="t m0 x1 h8 y176 ff1 fs1 fc0 sc0 ls1 wsc">sheet of paper. Include your name and A -Number (if any) at </div>
          <div class="t m0 x1 h3 y177 ff1 fs1 fc0 sc0 ls1 wsc">the top of each sheet; indicate the <span class="ff2">Page Number, Part </span></div>
          <div class="t m0 x1 h3 y14f ff2 fs1 fc0 sc0 ls1 wsc">Number, <span class="ff1">and</span> Item Number<span class="ff1"> to which your answer refers; and </span></div>
          <div class="t m0 x1 h8 y178 ff1 fs1 fc0 sc0 ls1 wsc">sign and date each sheet.</div>
          <div class="t m0 x1 h15 y179 ff4 fs3 fc0 sc0 ls1 wsc"> Your Full Name</div>
          <div class="t m0 x1 h3 y17a ff2 fs1 fc0 sc0 ls1 ws0">1.a.<span class="_"> </span><span class="ff1 wsc">Family Name </span></div>
          <div class="t m0 xd h8 y17b ff1 fs1 fc0 sc0 ls1 wsc">(Last Name) </div>
          <div class="t m0 x1 h3 y17c ff2 fs1 fc0 sc0 ls1 wsc">1.b. <span class="_ _1"> </span><span class="ff1">Given Name </span></div>
          <div class="t m0 xd h8 y17d ff1 fs1 fc0 sc0 ls1 wsc">(First Name) </div>
          <div class="t m0 x1 h3 y17e ff2 fs1 fc0 sc0 ls1" style="left: -65px; top: 214px;">
            1.c.<span class="ff1 wsc"> <span class="_ _5"> </span>Middle Name</span>
          </div>
          <div class="t m0 x1 h3 y17f ff2 fs1 fc0 sc0 ls1" style=" left: -64px; top: 236px;">
            2.<span class="ff1 wsc">       <span class="_ _26"></span>A-Number (if any) </span>
          </div>
          <div class="t m0 x1 h3 y180 ff2 fs1 fc0 sc0 ls1 ws0" style="left: -64px; top: 276px;">
            3.a.<span class="_"> </span><span class="ff1 wsc">Page Number<span class="_ _24"> </span></span><span class="ws8" style=" left: 277px; top: -53px;">
              3.b.<span class="_"> </span><span class="ff1 wsc">Part Number<span class="_ _25"> </span></span><span class="ws9">3.c.<span class="_"> </span><span class="ff1 wsc">Item Number</span></span>
            </span>
          </div>
          <div class="t m0 x10 h14 y181 ff2 fs1 fc0 sc0 ls1 ws0" style="left: 217px; top: 6px;">
            5.a.<span class="_"> </span><span class="ff1 wsc v0">Page Number<span class="_ _24"> </span><span class="ff2 ws8">5.b.<span class="_"> </span></span>Part Number<span class="_ _25"> </span><span class="ff2 ws9">5.c.<span class="_"> </span></span>Item Number</span>
          </div>
          <div class="t m0 x15 h2 y1 ff1 fs0 fc0 sc0 ls1 wsc">Page 7 of 7</div>
          <div class="t m0 x1 h14 y182 ff2 fs1 fc0 sc0 ls1 ws0" style="left: -64px; bottom: 249px;">
            4.a.<span class="_"> </span><span class="ff1 wsc v0">Page Number<span class="_ _24"> </span><span class="ff2 ws8">4.b.<span class="_"> </span></span>Part Number<span class="_ _25"> </span><span class="ff2 ws9">4.c.<span class="_"> </span></span>Item Number</span>
          </div>
          <div class="t m0 x1 h3 y183 ff2 fs1 fc0 sc0 ls1">4.d.</div>
          <div class="t m0 x10 h14 y184 ff2 fs1 fc0 sc0 ls1 ws0" style="left: 217px; bottom: 290px;">
            7.a.<span class="_"> </span><span class="ff1 wsc v0">Page Number<span class="_ _24"> </span><span class="ff2 ws8">7.b.<span class="_"> </span></span>Part Number<span class="_ _25"> </span><span class="ff2 ws9">7.c.<span class="_"> </span></span>Item Number</span>
          </div>
          <div class="t m0 x10 h3 y185 ff2 fs1 fc0 sc0 ls1">7.d.</div>
          <div class="t m0 x19 h5 y186 ff2 fs3 fc0 sc0 ls1">A-</div>
        </div>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 141px; left: 124px; ">@InformationAboutYou.LastName </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 165px; left: 124px; ">@InformationAboutYou.FirstName </p>
        <p class="t m2 xf h8 y23 ff1 fs1 fc0 sc0 ls1 wsc" style="top: 188px; left: 124px; ">@InformationAboutYou.MiddleName </p>
        <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
      </div>
    </div>
  </body>

  </html>
`


  constructor() { }

  ngOnInit(): void {
  }

}
