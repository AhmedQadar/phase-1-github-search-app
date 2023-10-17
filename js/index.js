document.addEventListener('DOMContentLoaded', function () {
    const githubForm = document.getElementById('github-form');
    const inputSearch = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const repoList = document.getElementById('repos-list');

    
    githubForm.addEventListener('submit', function (e) {
        e.preventDefault();

        userList.innerHTML = "";
        repoList.innerHTML = "";
    
        const inputValue = inputSearch.value;
        fetch(`https://api.github.com/search/users?q=${inputValue}`, {
            headers: {
                accept: 'application/vnd.github.v3+json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            if(data.items) {
            data.items.forEach((user) => {
                const userInput = document.createElement('li');
                userInput.innerHTML = `
                <img src='${user.avatar_url}' alt='${user.login}' width='40' height='40'>
                <a href='${user.html_url}' target='_blank'>${user.login}</a>
            `;

            userList.appendChild(userInput);
            
            userInput.addEventListener('click', function () {
                fetchUserRepos(user.login, repoList);
            });

            });
          } else {
            console.error('No user Data Found');
          }
        })
        .catch((error) => {
            console.error('Error fetching user data', error);
        });

    });

    
}) 

function fetchUserRepos (username, repoList) {
    fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
            accept: 'application/vnd.github.v3+json'
        }
    })
    .then((resp) => resp.json())
    .then((data) => {
        repoList.innerHTML = '';
        
        console.log(data);

        data.forEach((repo) => {
            const repoItem = document.createElement('li');
            repoItem.innerHTML = `<a href='${repo.html_url}' target='_blank'>${repo.name}</a>`;
             
            repoList.appendChild(repoItem);
        });   
    })
    .catch((error) => {
        console.error('Error fetching user repos', error);
    });
}

    



    