addEventListener('DOMContentLoaded', () => {
    const stakingModal = document.querySelector('.staking-modal');
    if (stakingModal) {
        let range = stakingModal.querySelector('[type="range"]');
        range.oninput = e => {
            range.style.setProperty('--value', (range.value - range.min) / (range.max - range.min))
            stakingModal.querySelector('.duration').textContent = range.value == 1 ? '1 week' : range.value + ' weeks'
            let date = new Date();
            date.setDate(date.getDate() + range.value * 7)
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            stakingModal.querySelector('.endDate').textContent = `End Data: ${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`
        }
    }
});