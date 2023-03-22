<p align="center">
  <a href="https://github.com/chadwuo/li-ji-weapp">
    <img src="doc/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">礼记</h3>
  <p align="center">
    每一份人情都值得礼记
    <br />
    <a href="https://github.com/Chadwuo/li-ji-weapp/issues/new?template=bug_report.md">报告Bug</a>
    ·
    <a href="https://github.com/Chadwuo/li-ji-weapp/issues/new?template=feature_request.md">提出新特性</a>
  </p>
</p>

  礼尚往来，是中华民族的传统美德，老一辈人一般会在举行宴席的时候用手写人情簿的方式来记录每一个亲友的送礼，然后在对方有宴席邀请的时候翻阅人情簿，计算出送礼金额。这种方式存在很多弊端，比如人情簿丢失、无法携带在身边、很难搜索到某个人的送礼记录、由于手写原因无法辨认清楚内容等等。
  
  「礼记」是一款微信小程序，方便随时随地查看和记录亲友的礼金情况。随身携带、快速查找人情、统计汇总礼金、亲友往来明细、家庭共享记账、安全可靠。

---

### 在线体验
 <img src="doc/code.png" alt="Logo" width="240" height="240">

### 效果图

<table>
  <tr>
    <td><img src="doc/image1.jpeg"></td>
    <td><img src="doc/image2.jpeg"></td>
    <td><img src="doc/image3.jpeg"></td>
    <td><img src="doc/image4.jpeg"></td>
    <td><img src="doc/image5.jpeg"></td>
  </tr>
 </table>

### 文件目录说明

```
li-ji-weapp 
├── LICENSE.txt
├── README.md
├── /miniprogram/--小程序目录
│  ├── /alicloud/--阿里云 Serverless服务
│  ├── /config/--MP-CU配置文件
│  ├── /mp-cu/--ColorUi主框架的文件夹，不建议修改这里面的文件，以免后续升级时，被覆盖。
│  ├── /mp-sdk/--ColorUi框架的辅助文件夹，封装了一些常用的方法函数、扩展图标库等，按需使用，如不需要，可删除此文件夹。
│  ├── /components/--自定义组件
│  ├── /pages/--页面
│  ├── /static/--资源文件
│  ├── /utils/
│  ├── app.js
│  ├── app.json
│  ├── app.wxss

```
### 安装教程
下载代码导入到微信开发者工具，<br>
在miniprogram终端执行 ```npm init -y```，使用默认信息初始化<br>
在miniprogram终端执行```npm i @vant/weapp -S –production```<br>
app.js里修改<br>
```
import {
    mpserverless
} from './alicloud/index'
```
替换为
```
import MPServerless from '@alicloud/mpserverless-sdk'
const mpserverless = new MPServerless(wx, {
    appId: 'wx小程序appid',
    spaceId: '阿里云服务空间id',
    clientSecret: '阿里云服务秘钥',
    endpoint: 'https://api.next.bspapp.com',
    timeout: 40 * 1000
});
```
在阿里云的serverless里创建数据表，
```
book、family、family_member、friend、gift_out、gift_receive、user
```
serverless里记得绑定微信小程序的appid和secret，<br>
微信小程序那边记得绑定阿里云的域名。<br>
Request域名是https://api.next.bspapp.com<br>
download和upload域名在serverless里有个上传域名<br>

### 作者
<table>
    <tbody>
        <tr>
            <td align="center" valign="middle">
                <a href="https://github.com/chadwuo" target="_blank">
                    <img width="80px" src="https://avatars.githubusercontent.com/u/41413559?v=4" alt="@chadwuo">
                    <div>@chadwuo</div>
                </a>
            </td>
        </tr>
    </tbody>
</table>

### 更新日志

[ChangeLog](https://github.com/chadwuo/li-ji-weapp/releases)

### 版权说明

该项目签署了GPL-3.0授权许可，详情请参阅 [LICENSE.txt](https://github.com/chadwuo/li-ji-weapp/blob/master/LICENSE)，请自由地享受和参与开源。

### 鸣谢

- [MP-CU](https://github.com/Color-UI/MP-CU)：colorUI3.x 微信小程序原生版
- [Vant weapp](https://github.com/youzan/vant-weapp)：轻量、可靠的小程序 UI 组件库
- [wl-pinyin](https://www.npmjs.com/package/wl-pinyin)：汉字转拼音库
- [dayjs](https://github.com/iamkun/dayjs)：Moment.js 的 2kB 轻量化方案，拥有同样强大的 API
- [wx-calendar](https://github.com/lspriv/wx-calendar)：借鉴了MIUI 12日历的部分设计，制作适合微信小程序的日历
- [relationship](https://github.com/mumuy/relationship)：中国亲戚关系计算器
- <s>腾讯云（涨价了，负担不起，已迁移至阿里云）</s>
- [阿里云 Serverless](https://serverless.aliyun.com)：阿里云 Serverless
- [今日诗词 API](https://www.jinrishici.com)：![今日诗词](https://v2.jinrishici.com/one.svg)

<!-- links -->
[license-url]: https://github.com/chadwuo/li-ji-weapp/blob/master/LICENSE.txt

