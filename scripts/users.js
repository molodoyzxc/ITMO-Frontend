document.addEventListener('DOMContentLoaded', () => {
    console.log('Страница загружена, инициализация запроса к API.');

    const commentList = document.getElementById('commentList');
    const preloader = document.getElementById('preloader');
    const apiUrl = 'https://jsonplaceholder.typicode.com/comments';

    function fetchComments() {
        document.body.style.backgroundColor = 'white';

        preloader.style.display = 'block';
        commentList.innerHTML = '';

        const randomFilter = Math.random() > 0.5 ? '?id_gte=100' : '?id_lte=50';
        console.log('Фильтр для запроса:', randomFilter);

        fetch(apiUrl + randomFilter)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка сети');
                }
                console.log('Данные получены, скрытие preloader.');
                return response.json();
            })
            .then(data => {
                setTimeout(() => {
                    preloader.style.display = 'none';
                    document.body.style.backgroundColor = '';
                    console.log('Рендеринг данных:', data);
                    renderComments(data);
                }, 2000);
            })
            .catch(error => {
                preloader.style.display = 'none';
                document.body.style.backgroundColor = 'white';
                console.error('Ошибка запроса:', error.message);
                commentList.innerHTML = `<p class="error">⚠ Ошибка: ${error.message}</p>`;
            });
    }

    function renderComments(comments) {
        const limitedComments = comments.slice(0, 10);

        if (limitedComments.length === 0) {
            commentList.innerHTML = '<p class="no-data">Нет данных.</p>';
            return;
        }

        limitedComments.forEach(comment => {
            const commentItem = document.createElement('div');
            commentItem.classList.add('comment-item');
            commentItem.innerHTML = `
            <h3>${comment.name}</h3>
            <p><strong>Email:</strong> ${comment.email}</p>
            <p>${comment.body}</p>
        `;
            commentList.appendChild(commentItem);
        });
    }

    fetchComments();
});
