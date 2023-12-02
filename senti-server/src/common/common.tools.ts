import { NotFoundException } from '@nestjs/common';

/**
 * @param qb
 * @param pageNum
 * @param pageSize
 * @description 分页查询 -TypeORM
 */
export const pageQueryBuilder = async (
  qb,
  pageNum: number,
  pageSize: number,
): Promise<object> => {
  const take = pageSize || 10,
    skip = (pageNum - 1) * take || 0;

  await qb.skip(skip).take(take);
  const [list, total] = await qb.getManyAndCount();
  return { list, total };
};

/**
 * @param entity
 * @param id
 * @returns 删除by id -TypeORM
 */
export const deleteEntityById = async (entity, id): Promise<any> => {
  let ret = await entity.findOne(id);
  if (!ret) throw new NotFoundException(`删除失败 ,不存在的id: ${id}`);
  ret.deleteAt = await new Date();
  await entity.save(ret);
  return id;
};

export class DbTools {
  /**
   * @param qb
   * @param pageNum
   * @param pageSize
   * @description 分页查询 -TypeORM
   */
  async pageQueryBuilder(qb, pageNum: number, pageSize: number): Promise<any> {
    const take = pageSize || 10,
      skip = (pageNum - 1) * take || 0;

    await qb.offset(skip).limit(take);
    const [list, total] = await qb.getManyAndCount();
    return { list, total };
  }

  /**
   * @param entity
   * @param id
   * @returns 删除by id -TypeORM
   */
  async deleteEntityById(entity, id, where = {}): Promise<any> {
    let ret = await entity.findOne({ where: { id, ...where } });
    if (!ret) throw new NotFoundException(`删除失败 ,不存在的id: ${id}`);
    ret.deleteAt = await new Date();
    await entity.save(ret);
    return id;
  }
}

export class CommonTools {
  //出生日期获取 -年龄
  birthdayToAge(strBirthday) {
    var returnAge;
    var strBirthdayArr = strBirthday.split('-');
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if (nowYear == birthYear) {
      returnAge = 0; //同年 则为0岁
    } else {
      var ageDiff = nowYear - birthYear; //年之差
      if (ageDiff > 0) {
        if (nowMonth == birthMonth) {
          var dayDiff = nowDay - birthDay; //日之差
          if (dayDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        } else {
          var monthDiff = nowMonth - birthMonth; //月之差
          if (monthDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        }
      } else {
        returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
      }
    }

    return returnAge; //返回周岁年龄
  }

  //身份证号获取 -性别
  idCardToGender(psidno) {
    let sexno, sex;
    if (psidno.length == 18) {
      sexno = psidno.substring(16, 17);
    } else if (psidno.length == 15) {
      sexno = psidno.substring(14, 15);
    } else {
      return 'error';
    }
    let tempid = sexno % 2;
    if (tempid == 0) {
      sex = '女性';
    } else {
      sex = '男性';
    }
    return sex;
  }

  //身份证号获取 -出生日期
  idCardTobirthday(psidno): any {
    let birthdayno, birthdaytemp;
    if (psidno.length == 18) {
      birthdayno = psidno.substring(6, 14);
    } else if (psidno.length == 15) {
      birthdaytemp = psidno.substring(6, 12);
      birthdayno = '19' + birthdaytemp;
    } else {
      console.log('错误的身份证号码，请核对！');
      return false;
    }
    let birthday =
      birthdayno.substring(0, 4) +
      '-' +
      birthdayno.substring(4, 6) +
      '-' +
      birthdayno.substring(6, 8);
    return birthday;
  }

  //身份证号获取 -年龄
  idCardToAge(psidno) {
    //出生年月
    let birthday = this.idCardTobirthday(psidno);

    //计算年龄
    let r = birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) return false;
    let d = new Date(r[1], r[3] - 1, r[4]);
    if (
      d.getFullYear() == r[1] &&
      d.getMonth() + 1 == r[3] &&
      d.getDate() == r[4]
    ) {
      let Y = new Date().getFullYear();
      return Y - r[1];
    }

    console.log('输入的日期格式错误！');
    return false;
  }

  /*
   * 身份证15位编码规则：dddddd yymmdd xx p
   * dddddd：6位地区编码
   * yymmdd: 出生年(两位年)月日，如：910215
   * xx: 顺序编码，系统产生，无法确定
   * p: 性别，奇数为男，偶数为女
   *
   * 身份证18位编码规则：dddddd yyyymmdd xxx y
   * dddddd：6位地区编码
   * yyyymmdd: 出生年(四位年)月日，如：19910215
   * xxx：顺序编码，系统产生，无法确定，奇数为男，偶数为女
   * y: 校验码，该位数值可通过前17位计算获得
   *
   * 前17位号码加权因子为 Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
   * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
   * 如果验证码恰好是10，为了保证身份证是十八位，那么第十八位将用X来代替
   * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
   * i为身份证号码1...17 位; Y_P为校验码Y所在校验码数组位置
   */
  isIdCard(idCard) {
    //15位和18位身份证号码的正则表达式
    var regIdCard = new RegExp(
      '^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$|^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$',
    );
    // var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
      if (idCard.length == 18) {
        //将前17位加权因子保存在数组里
        var idCardWi = new Array(
          7,
          9,
          10,
          5,
          8,
          4,
          2,
          1,
          6,
          3,
          7,
          9,
          10,
          5,
          8,
          4,
          2,
        );

        var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
        var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
        for (var i = 0; i < 17; i++) {
          idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
        }
        var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
        var idCardLast = idCard.substring(17); //得到最后一位身份证号码
        //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
        if (idCardMod == 2) {
          if (idCardLast == 'X' || idCardLast == 'x') {
            return true;
          } else {
            return false;
          }
        } else {
          //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
          if (idCardLast == idCardY[idCardMod]) {
            return true;
          } else {
            return false;
          }
        }
      }
    } else {
      return false;
    }
  }
}
