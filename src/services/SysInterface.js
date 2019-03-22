export const SYS_LOGIN = '/sys/verificationUser'; // 登录

export const SYS_LOGOUT = '/sys/logout'; // 退出登录

export const SYS_Dict = '/sys/sysDictListType'; // 数据字典

export const SYS_USER_INFO = '/sys/getUserInfoDetailed'; // 当前用户信息

export const SYS_MENU = '/sys/getSysMenu'; // 用户拥有的菜单

export const SYS_USER_TOP = '/sys/getSysUserTop'; // 用户管理头部信息

export const SYS_USER_LIST = '/sys/sysUserList'; // 用户列表

export const SYS_INFO = '/sys/getUserInfoDetailedId'; // 根据主键id获取用户详情

export const SYS_D_TREE = '/sys/departmentListAllTree'; // 部门树结构

export const SYS_D_ROLE = '/sys/roleListDepartments'; // 根究部门查询旗下的角色

export const SYS_UP_USER = '/sys/upSysUser'; // 更新系统用户

export const SYS_ADD_USER = '/sys/addSysUser'; // 添加系统用户

export const SYS_DEL_USER = '/sys/deleteSysUser'; // 根据id删除用户

export const SYS_RESET_PASSWORD = '/sys/resetPassword'; // 根据主键id重置密码

export const SYS_PER_TREE = '/sys/perListTree'; // 权限树结构

export const SYS_ADD_PER = '/sys/addSysPer'; // 添加权限

export const SYS_UP_PER = '/sys/upSysPer'; // 修改权限

export const SYS_DEL_PER = '/sys/deleteSysPer'; // 删除权限

export const SYS_ADD_D = '/sys/addSysDepartment'; // 添加部门

export const SYS_UP_D = '/sys/upSysDepartment'; // 修改部门

export const SYS_DEL_D = '/sys/deleteSysDepartment'; // 删除部门

export const SYS_ROLE_LIST = '/sys/getSysRoleList'; // 角色列表

export const SYS_ADD_ROLE = '/sys/addSysRole'; // 添加角色

export const SYS_UP_ROLE = '/sys/upSysRole'; // 修改角色

export const SYS_DEL_ROLE = '/sys/deleteSysRole'; // 删除角色

export const SYS_ROLE_INFO = '/sys/getSysRoleInfo'; // 根据主键id获取角色详情

export const SYS_LOG_LIST = '/sys/sysLogList'; // 日志列表

export const SYS_LOG_TOTAL = '/sys/sysLogTotal'; // 日志统计

export const SYS_SEND_INFO = '/sys/sendInformation'; // 发送消息

export const SYS_LIST_INFO = '/sys/sendRecord'; // 发送记录

export const SYS_RECORD_TOP = '/sys/informationTop'; // 站内信发送记录头部

export const SYS_WITHDRAW_INFO = '/sys/withdraw'; // 消息撤回

export const SYS_INFO_INFO = '/sys/informationInfo'; // 发送消息详情

export const SYS_LIST_MAIL = '/sys/sysMailList'; // 站内信记录

export const SYS_READ_MAIL = '/sys/markedRead'; // 站内信标记已读

export const SYS_DEL_MAIL = '/sys/delMail'; // 站内信删除

export const SYS_MAIL_INFO = '/sys/sysMailInfo'; // 站内信详情

export const SYS_NOTICE = '/sys/sysNoticeList'; // 未读站内信

export const SYS_READ_ALL = '/sys/readAll'; // 批量已读

// ------------ 迁入 start ----------------

export const MOVE_IN = '/household/immigration'; // 户口迁入

// ------------ 迁入 end ----------------
// ------------ 审批 start ----------------

export const EXAMINE_LIST = '/household/householdChangeList'; // 审批列表

export const EXAMINE_LIST_HEADER = '/household/approvalHead'; // 审批列表头部汇总

export const EXAMINE_Detail = '/household/householdChangeInfo'; // 审批详情

export const EXAMINE_RECORD = '/household/auditRecord'; // 审批记录

export const MOVEIN_CANCEL = '/household/cancel'; // 迁入作废

export const MOVEIN_SUCCESS = '/household/auditSuccess'; // 迁入通过

// ------------ 审批 end ----------------

// ------------ 户口簿 start ----------------

export const HOUSEHOLD_LIST_HEADER = '/household/householdHead'; // 户口簿列表头部汇总

export const HOUSEHOLD_LIST = '/household/householdRegisterList'; // 户口簿列表

export const HOUSEHOLD_DETAIL = '/household/householdRegisterInfo'; // 户口簿详情

export const HISTORY_DETAIL = '/household/householdVersionInfo'; // 户口簿历史详情

// ------------ 户口簿 end ----------------

// ------------ 成员 start ----------------

export const MEMBER_LIST_HEADER = '/household/householdMemberHead'; // 成员列表头部汇总

export const MEMBER_LIST = '/household/householdMemberList'; // 成员列表

export const MEMBER_DETAIL = '/household/householdMemberInfo'; // 成员详情

// ------------ 成员 end ----------------
