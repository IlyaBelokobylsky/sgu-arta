// Отметить четные-нечетные пункты списка для правильного расположения картинок
if (document.querySelector('.done-projects__list')) {
    const doneProjectsList = [...document.querySelector('.done-projects__list').children];
    doneProjectsList.forEach(function(item, index) {
        if ((index + 1) % 2 === 0) {
            item.classList.add('even');
        }
    });
}
// Обработка нажатий на гамбургер
const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', function() {
    hamburger.classList.add('hidden');
    setTimeout(function() {
        hamburger.classList.remove('hidden');
        hamburger.classList.toggle('opened');
    }, 200);
    document.querySelector('.header__navigation').classList.toggle('opened');
});