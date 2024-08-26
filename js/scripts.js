// Sample data for posts
let postsData = [
    { id: 1, author: 'John', content: 'Hello, Instagram!', likes: 10, comments: ['Great post!', 'Nice photo!'], image: 'https://files.codingninjas.in/image2-28694.jpg' },
    { id: 2, author: 'Jane', content: 'This is a great post!', likes: 15, comments: [], image: 'https://files.codingninjas.in/oip-28704.jpg' },
    { id: 3, author: 'Alice', content: 'Another post', likes: 8, comments: [], image: 'https://files.codingninjas.in/th-2-28706.jpg' },
    { id: 4, author: 'Bob', content: 'Check out this photo!', likes: 20, comments: [], image: 'https://files.codingninjas.in/image1-28708.jpg' },
];

// Function to render posts
function renderPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    postsData.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const authorElement = document.createElement('h3');
        authorElement.textContent = post.author;

        const imageElement = document.createElement('img');
        imageElement.src = post.image;
        imageElement.alt = 'Post Image';

        const contentElement = document.createElement('p');
        contentElement.textContent = post.content;

        const likeButton = document.createElement('button');
        likeButton.textContent = `Like`;
        likeButton.classList.add('like-button');
        likeButton.addEventListener('click', () => {
            if (!likeButton.disabled) {
                post.likes++;
                likeButton.disabled = true;
                likeButton.style.backgroundColor = 'red';
                updateFooter(post, postFooter);
            }
        });

        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Write a comment...';

        const commentButton = document.createElement('button');
        commentButton.textContent = 'Comment';
        commentButton.classList.add('comment-button');
        commentButton.addEventListener('click', () => {
            const commentText = commentInput.value.trim();
            if (commentText) {
                post.comments.push(commentText);
                commentInput.value = '';
                addCommentToContainer(commentText, commentsContainer);
                updateFooter(post, postFooter);
            }
        });

        const postFooter = document.createElement('div');
        postFooter.classList.add('post-footer');
        updateFooter(post, postFooter);

        const commentsContainer = document.createElement('div');
        commentsContainer.classList.add('comments-container');
        commentsContainer.style.display = 'none';

        post.comments.forEach((comment) => {
            addCommentToContainer(comment, commentsContainer);
        });

        postElement.appendChild(authorElement);
        postElement.appendChild(imageElement);
        postElement.appendChild(contentElement);
        postElement.appendChild(likeButton);
        postElement.appendChild(commentInput);
        postElement.appendChild(commentButton);
        postElement.appendChild(postFooter);
        postElement.appendChild(commentsContainer);

        postFooter.addEventListener('click', () => {
            commentsContainer.style.display = commentsContainer.style.display === 'none' ? 'block' : 'none';
        });

        postsContainer.appendChild(postElement);
    });
}

// Function to update post footer
function updateFooter(post, footerElement) {
    footerElement.textContent = `Likes: ${post.likes}   Comments: ${post.comments.length}`;
}

// Function to add a comment to the container
function addCommentToContainer(comment, container) {
    const commentElement = document.createElement('p');
    commentElement.textContent = comment;
    container.appendChild(commentElement);
}

// Function to handle form submission and add a new post
function addNewPost(event) {
    event.preventDefault(); // Prevent form from submitting in the traditional way

    const postContent = document.getElementById('postInput').value.trim();
    const postImageFile = document.getElementById('imageInput').files[0];

    if (postContent && postImageFile) {
        const newPost = {
            id: postsData.length + 1, // Generate a new ID
            author: 'You', // Set the author name to "You"
            content: postContent,
            likes: 0,
            comments: [],
            image: URL.createObjectURL(postImageFile) // Create an object URL for the uploaded image
        };

        postsData.push(newPost); // Add the new post to the postsData array
        renderPosts(); // Re-render the posts to display the new post

        // Reset the form
        document.getElementById('postForm').reset();
    } else {
        alert('Please fill out all fields.');
    }
}

// Add submit event listener to the form
document.getElementById('postForm').addEventListener('submit', addNewPost);

renderPosts(); // Initial render
