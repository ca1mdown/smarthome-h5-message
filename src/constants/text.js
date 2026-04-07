export const TEXT = {
  // --- User Provided Keys ---
  messagecenter_title: "消息中心",
  messagecenter_markMessages: "营销消息",
  messagecenter_activity_message: "活动通知",
  research_msg: "调研消息",
  ems_download_app_button: "下载APP",
  NMessage_center_bottom: "点击%@，消息推送更快、更稳定。",
  messagecenter_msgSettings: "消息设置",
  allow_notification: "允许通知",
  NMessage_setting: "开启“允许通知”，实时接收重要提醒。",
  common_ui_turn_on: "开启",
  common_ui_on: "已开启",
  helpcenter_problem_messageNotification: "消息通知",
  
  // 免打扰
  messagecenter_doNotDisturb: "免打扰",
  messagecenter_dndForTheTime: "在我设置的时间段内免打扰",
  messagecenter_msgStart: "开始",
  messagecenter_msgEnd: "结束",
  
  // 根据消息类型
  noti_setting_type: "根据消息类型",
  
  // 开启成功
  NMessage_center_waiting: "正在请求浏览器...", // [UNUSED]
  
  // 开启失败
  revamp_sr_service_failed: "失败",
  NMessage_failed1: "1.开启失败。建议先删除主屏幕快捷方式，并清除当前浏览器缓存后，将本应用重新添加至主屏幕，再尝试开启。",
  NMessage_failed2: "2.若始终无法开启，推荐下载APP，消息推送更快、更稳定。",
  getit: "我知道了",

  // --- Keys from other projects (High Priority) ---
  select_all: "全选",
  messagecenter_noMoreMsg: "没有更多消息了",
  push_messages_none: "暂无消息",
  messagecenter_clearSceneMsg: "确认删除选中的消息？",
  msg_mark_all_as_read: "确认将选中的消息设置为已读？",
  common_ui_cancel: "取消",
  promotion_detail: "查看详情",

  // --- Detail View ---
  detail_title: "Beyond Details & Win",
  detail_btn: "View Details",
  detail_placeholder_text: "Here's the text. Here's the text.",
  detail_exclusive_title: "App Exclusive Content",
  detail_exclusive_desc: "This message details page is an app-exclusive feature. Open the app to view the full content.",
  detail_fault_title: "Fault reminder",
  detail_fault_error_code: "Error code: %@",

  // --- List items ---
  list_loading: "Loading...",
  list_participation_thank: "Thank you for your participation", // [UNUSED]
  list_delete: "删除",
  list_read: "已读",
  
  // --- Unused User Provided Keys (Marked) ---
  // NMessage_center_waiting: "正在请求浏览器...", // Already marked above
};

/**
 * Asynchronously fetch TEXT from an API.
 * Falls back to local TEXT if the request fails.
 */
export const fetchText = async () => {
  try {
    // Simulate API call
    // const response = await fetch('/api/text');
    // const remoteText = await response.json();
    // return { ...TEXT, ...remoteText };
    
    // For now, just return local TEXT to simulate success/fallback
    return TEXT;
  } catch (error) {
    console.error('Failed to fetch remote text, using local fallback:', error);
    return TEXT;
  }
};
