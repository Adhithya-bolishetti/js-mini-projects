let posts = JSON.parse(localStorage.getItem("posts")) || [];

function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function addPost() {
    const input = document.getElementById("postInput");
    const text = input.value.trim();

    if(!text) return;

    const newPost = {
        id: Date.now(),
        content: text,
        likes: 0,
        comments: []
    };

    posts.unshift(newPost);
    input.value = "";
    savePosts();
    renderPosts();
}

function likePost(id) {
    posts = posts.map(post => 
        post.id === id ? {...post, likes: post.likes+1} : post
    );

    savePosts();
    renderPosts();
}

function addComment(postId) {
    const input = document.getElementById(`comment-${postId}`);
    const text = input.value.trim();

    if (!text) return;

    posts = posts.map(post =>
        post.id === postId
            ? { ...post, comments: [...post.comments, text] }
            : post
    );

    savePosts();
    renderPosts();
}


function renderPosts() {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    posts.forEach(post => {
        const div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `
            <p>${post.content}</p>
            <div class="post-actions">
                <span onclick="likePost(${post.id})">👍 Like (${post.likes})</span>
            </div>
            <div class="comments">
                ${post.comments.map(c => `<div>💬 ${c}</div>`).join(" ")}
                <div class="comment-input">
                    <input type="text" id="comment-${post.id}" placeholder="Write a comment...">
                    <button onclick="addComment(${post.id})">Post</button>
                </div>
            </div>
        `;

        feed.appendChild(div);
    });
}

renderPosts();