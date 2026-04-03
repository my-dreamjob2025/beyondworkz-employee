/**
 * In-app notifications from API + Socket.IO.
 * Shape: { id, title, message, timeLabel, unread?, iconSrc? }
 */
const NotificationDropdown = ({
  notifications = [],
  onMarkAllRead,
  onItemClick,
}) => {
  const list = Array.isArray(notifications) ? notifications : [];
  const unreadCount = list.filter((n) => n.unread).length;
  const allCount = list.length;

  return (
    <div className="absolute right-0 mt-3 w-[calc(100vw-2rem)] max-w-[360px] min-w-0 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
      <div className="flex items-center justify-between px-5 py-3 border-b">
        <h3 className="font-semibold text-slate-800">Notifications</h3>
        {allCount > 0 ? (
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline disabled:opacity-50"
            disabled={unreadCount === 0}
            onClick={() => onMarkAllRead?.()}
          >
            Mark all as read
          </button>
        ) : (
          <span className="text-xs text-slate-400">No alerts</span>
        )}
      </div>

      <div className="divide-y max-h-[min(60vh,320px)] overflow-y-auto">
        {list.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-slate-500">
            No notifications yet. Activity about applications and interviews will appear here when available.
          </p>
        ) : (
          list.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => onItemClick?.(item.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onItemClick?.(item.id);
              }}
              className="flex gap-4 border-[#ffffff] px-5 py-4 hover:bg-[#2563EB08] cursor-pointer transition"
            >
              {item.iconSrc ? (
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#2563EB08] shrink-0">
                  <img src={item.iconSrc} alt="" className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 shrink-0">
                  <span className="text-slate-500 text-xs font-semibold">!</span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                {item.message ? (
                  <p className="text-xs text-slate-500 mt-1">{item.message}</p>
                ) : null}
                {item.timeLabel ? (
                  <p className="text-xs text-slate-400 mt-2">{item.timeLabel}</p>
                ) : null}
              </div>

              {item.unread ? (
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 shrink-0" aria-hidden />
              ) : null}
            </div>
          ))
        )}
      </div>

      {allCount > 0 ? (
        <div className="text-center py-3 border-t border-[#00000014]">
          <button type="button" className="text-blue-600 text-sm font-medium hover:underline">
            View all notifications
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default NotificationDropdown;
