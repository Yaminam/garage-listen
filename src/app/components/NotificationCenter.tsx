import { Bell, X, Check } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { Button } from './ui/button';

export function NotificationCenter() {
  const { notifications, markAsRead, removeNotification, clearAll } = useNotification();

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          <h2 className="font-semibold">Notifications</h2>
          <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.filter(n => !n.read).length}
          </span>
        </div>
        {notifications.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll}>Clear all</Button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No notifications yet
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm">{notification.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      notification.type === 'error' ? 'bg-red-100 text-red-700' :
                      notification.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                      notification.type === 'success' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {notification.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
