import BoardView from '@/components/templates/board-view'
import LoginView from '@/components/templates/login-view'
import TaskDetailModal from '@/components/templates/task-detail-modal'

export default [{
  routes: [
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
}]
