// Users part elements
const elUsersList = document.querySelector('.users__list');
const elUsersTemplate = document.querySelector('#users__template').content;
const elUsersItem = elUsersTemplate.querySelector('.users__item');

// Posts part elements
const elPostsList = document.querySelector('.posts__list');
const elPostsTemplate = document.querySelector('#posts__template').content;

//Comments part elements
const elCommentsList = document.querySelector('.comments__list');
const elCommentsTemplate = document.querySelector('#comments__template').content;


// Render Users
function renderUsers(usersArray, element) {
    window.localStorage.setItem('users', JSON.stringify(usersArray));

    element.innerHTML = null;

    const usersFragment = document.createDocumentFragment();

	usersArray.forEach((user) => {        

		const newUsersTemplate = elUsersTemplate.cloneNode(true);

        newUsersTemplate.querySelector('.users__id').textContent = user.id;
        newUsersTemplate.querySelector('.users__name').textContent =user.name;
        newUsersTemplate.querySelector('.users__username').textContent = 'Username: @' + user.username;
        newUsersTemplate.querySelector('.users__phone').textContent = 'Mobile: ' + user.phone;
        newUsersTemplate.querySelector('.users__email').href = 'mailto: ' + user.email;
        newUsersTemplate.querySelector('.users__email').textContent = 'Email: ' + user.email;        
        newUsersTemplate.querySelector('.users__website').href = 'http://www.' + user.website;
        newUsersTemplate.querySelector('.users__website').textContent = 'Website: ' + user.website;

        newUsersTemplate.querySelector('.users__address-link').href = 'https://www.google.com/maps/place/' + user.address.geo.lat + ',' + user.address.geo.lng;
        newUsersTemplate.querySelector('.users__street').textContent = 'Address: ' +  user.address.street + ' , ' + user.address.suite;
        newUsersTemplate.querySelector('.users__city').textContent = user.address.city;
        newUsersTemplate.querySelector('.users__zipcode').textContent = user.address.zipcode;

        newUsersTemplate.querySelector('.company__name').textContent = user.company.name;
        newUsersTemplate.querySelector('.company__phrase').textContent = user.company.catchPhrase;
        newUsersTemplate.querySelector('.company__bs').textContent = user.company.bs;
        
        newUsersTemplate.querySelector('.users__item').dataset.userId=user.id;
		usersFragment.appendChild(newUsersTemplate);       
	});
	element.appendChild(usersFragment);    
}


// Fetch Users
async function fetchUsers() {

	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	const data = await response.json();

	renderUsers(data, elUsersList);
}

fetchUsers(); 


// Listen click of users item
elUsersList.addEventListener("click", (evt) =>{
    const selectedUserId = evt.target.dataset.userId;
    
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => {                    
        const selectedUserPosts = posts.filter((post) =>  post.userId == selectedUserId);
        renderPosts(selectedUserPosts, elPostsList);
    });
}); 


// Render posts
function renderPosts(postsArray, element) {
    window.localStorage.setItem('posts', JSON.stringify(postsArray));

    element.innerHTML = null;
    const postsFragment = document.createDocumentFragment();

    postsArray.forEach((post) => {
        const newPostsTemplate = elPostsTemplate.cloneNode(true);

        newPostsTemplate.querySelector('.posts__userid-paragraph').textContent ='User ID: ' + post.userId;
        newPostsTemplate.querySelector('.posts__id-paragraph').textContent = 'Post ID: ' + post.id;
        newPostsTemplate.querySelector('.posts__title').textContent = post.title;
        newPostsTemplate.querySelector('.posts__paragraph').textContent = post.body;

        newPostsTemplate.querySelector('.posts__item').dataset.postId=post.id;

        postsFragment.appendChild(newPostsTemplate);
        
    });
    element.appendChild(postsFragment);
}


// Fetch Posts
async function fetchPosts() {
    
	const response = await fetch('https://jsonplaceholder.typicode.com/posts?userId=');
	const data = await response.json();
	
	renderPosts(data, elPostsList);
}

fetchPosts(); 


// Listen click of posts item
elPostsList.addEventListener("click", (evt) =>{
    const selectedPostId = evt.target.dataset.postId;
    console.log(selectedPostId);
    fetch("https://jsonplaceholder.typicode.com/comments")
    .then((response) => response.json())
    .then((comments) => {                    
        const selectedPostComments = comments.filter((comment) =>  comment.postId == selectedPostId);
        renderComments(selectedPostComments, elCommentsList);
    });
});


// Render Comments 
function renderComments(commentsArray, element) {
    window.localStorage.setItem('comments', JSON.stringify(commentsArray));

    element.innerHTML = null;
    const commentsFragment = document.createDocumentFragment();

    commentsArray.forEach((comment) => {
        const newCommentsTemplate = elCommentsTemplate.cloneNode(true);

        newCommentsTemplate.querySelector('.comments__postsid-paragraph').textContent ='Post ID: ' + comment.postId;
        newCommentsTemplate.querySelector('.comments__id-paragraph').textContent = 'Comment ID: ' + comment.id;
        newCommentsTemplate.querySelector('.comments__title').textContent = comment.name;
        newCommentsTemplate.querySelector('.comments__email').href = 'mailto: ' + comment.email;
        newCommentsTemplate.querySelector('.comments__email').textContent = 'Comment by: ' + comment.email;
        newCommentsTemplate.querySelector('.comments__paragraph').textContent = comment.body;

        commentsFragment.appendChild(newCommentsTemplate);
        
    });
    element.appendChild(commentsFragment);
}


// Fetch Comments
async function fetchComments() {
	const response = await fetch('https://jsonplaceholder.typicode.com/comments?postId=');
	const data = await response.json();
	
	renderComments(data, elCommentsList);
}

fetchComments(); 

