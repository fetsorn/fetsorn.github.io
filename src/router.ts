import { createRouter, createWebHistory } from 'vue-router'
import Clicker from '@/pages/clicker.vue'
import Invite from '@/pages/invite.vue'
import MissionWallet from '@/pages/mission/wallet.vue'

const routes = [
    { path: '/', component: Clicker, name: 'clicker' },
    { path: '/invite', component: Invite, name: 'invite' },
    { path: '/mission-wallet', component: MissionWallet, name: 'mission-wallet' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
