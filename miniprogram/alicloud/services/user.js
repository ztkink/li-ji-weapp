const app = getApp();

/**
 * 获取用户信息
 * 如果没有会自动创建用户
 *
 * @author chadwuo
 */
exports.getUserInfo = async () => {
  const {
    mpserverless
  } = app
  const db = mpserverless.db;
  try {
    const res = await mpserverless.user.getInfo()
    if (!res.success) {
      throw new Error("操作失败");
    }
    const userId = res.result.user.userId // Serverless平台生成的用户ID
    let {
      result: user
    } = await db.collection('user').findOne({
      _id: userId
    })
    if (!user) {
      // 创建用户
      user = {
        _id: userId,
        nickName: '微信用户',
        avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        isVip: false,
        createTime: new Date(),
      }
      await db.collection('user').insertOne(user)
    }

    return {
      success: true,
      data: user
    }
  } catch (e) {
    return {
      success: false,
      message: e
    };
  }
}

/**
 * 更新用户数据
 *
 * @author chadwuo
 */
exports.updateUserInfo = async (parameter) => {
  const db = app.mpserverless.db;
  try {
    await db.collection('user').updateOne({
      _id: parameter._id
    }, {
      $set: {
        nickName: parameter.nickName,
        avatarUrl: parameter.avatarUrl
      }
    })
    return {
      success: true,
      data: ''
    };
  } catch (e) {
    return {
      success: false,
      message: e
    };
  }
};

/**
 * 获取用户数据范围
 *
 * @return data {Array.<string>} 用户id集合。
 * @author chadwuo
 */
exports.getUserDataScope = async () => {
  const userInfo = app.userInfo
  const db = app.mpserverless.db;
  // 获取家庭信息
  const {
    result: familyMember
  } = await db.collection('family_member').findOne({
    userId: userInfo._id
  })

  // 没有加入家庭，就返回自己的id
  if (!familyMember) {
    return [userInfo._id]
  }

  // 获取家庭其他成员信息
  const {
    result: familyInfos
  } = await db.collection('family_member').find({
    familyId: familyMember.familyId
  })

  let dataScope = familyInfos.map(i => {
    return i.userId
  })

  if (!dataScope || dataScope.length == 0) {
    return [userInfo._id]
  }

  return dataScope
}