import BoardView from '@/components/templates/board-view.vue'
import LoginView from '@/components/templates/login-view.vue'
import TaskDetailModal from '@/components/templates/task-detail-modal.vue'

export default [
  {
    path: '/',
    component: BoardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/tasks/:id',
    component: TaskDetailModal,
    meta: { requiresAuth: true }
  },
  {
    path: '*',
    redirect: '/'
  }
]
