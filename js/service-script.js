// IIFE для закрытия доступа к переменным извне
(function() {
    const parametersNames = [...document.querySelectorAll('.parameters__name')];
    parametersNames.forEach(function(item) {
        item.addEventListener('click', function(event) {
            const parent = event.target.closest('li');
            parent.classList.toggle('opened');
        });
    });

    const parametersParents = [...document.querySelectorAll('.parameters__hidden')];
    parametersParents.forEach(function(item) {
        for (let key of item.children) {
            key.addEventListener('click', function(event) {
                const target = event.target.closest('li'),
                    beforeChoosed = target.closest('ul').querySelector('.choosed');
                beforeChoosed && beforeChoosed.classList.remove('choosed');
                target.classList.add('choosed');
            });
        }
    });

    const stepItems = [...document.querySelectorAll('.step__item')];
    let price = 0;
    stepItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            const li = event.target.closest('li'),
                ul = event.target.closest('ul'),
                step = event.target.closest('.step'),
                choosedText = step.querySelector('.choosed-variant');
            if (!ul.classList.contains('more-variants')) {
                const beforeChecked = ul.querySelector('.choosed');

                beforeChecked != li && beforeChecked && beforeChecked.classList.remove('choosed');
                li.classList.contains('choosed') ?
                    choosedText.innerText = 'Не выбрано' :
                    choosedText.innerText = li.querySelector('.main-text').innerText;
            } else {
                let choosedQuan;
                li.classList.contains('choosed') ?
                    choosedQuan = ul.querySelectorAll('.choosed').length - 1 :
                    choosedQuan = ul.querySelectorAll('.choosed').length + 1;
                choosedQuan === 0 ?
                    choosedText.innerText = 'Не выбрано' :
                    choosedText.innerText = 'Выбрано ' + choosedQuan + ' услуги';
            }
            li.classList.toggle('choosed');
            
            // Изменение стоимости
            const pricesElemsArr = Array.from(document.querySelectorAll('.step__item.choosed > .price-hidden'));
            let pricesArr = [];
            for(let key of pricesElemsArr) {
                pricesArr.push(+key.value);
            }
            if (pricesArr.length > 0) {
                pricesArr.length == 1 ?
                    price = +pricesArr :
                    price = pricesArr.reduce((acc, val) => acc + val);
            } else {
                price = 0;
            }
            
            // Изменение вида большой суммы (добавление пробелов)
            price = price.toString().replace(/\d+/, function(substr) {
                let _str = substr.split('').reverse().join('');
                _str = _str.replace(/\d{3}/g, string => string.slice(0, 3) + ' ' + string.slice(3, _str.length))
                return _str.split('').reverse().join('');
            });

            +price === 0 ?
                document.querySelector('.conclusion-price').innerText = 'Не выбрана' :
                document.querySelector('.conclusion-price').innerText = `от ${price} рублей`;
            
            const conclusion = document.querySelector('.step__about-' + step.dataset.type);
            conclusion.innerText = choosedText.innerText;
            conclusion.innerText == 'Не выбрано' ? 
                conclusion.classList.add('not-choosed') :
                conclusion.classList.remove('not-choosed');
    
    
            const correct = li.querySelector('.correctable-img');
            if(correct) {
                // Переменная exp содержит тип изображения, который был найден в data-red
                const exp = (~correct.dataset.red.search('.png') && '.png') || (~correct.dataset.red.search('.svg') && '.svg');
                if (~correct.src.search('-red')) {
                    correct.src = correct.dataset.red.slice(0, correct.dataset.red.search('-red')) + exp;
                } else {
                    correct.src = correct.src.slice(0, correct.src.search('img')) + correct.dataset.red;
                }
            }    
        });
    });
})(); 