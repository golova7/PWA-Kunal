export default (to, from, next) => {
    localStorage.removeItem('user')

    next('/login')
}
