window.addEventListener("load", async function() {
    const cfId = window.location.pathname.split("/")[2];
  
    const cfPostsRequest = await fetch(`../cf/${cfId}`);
    const cfPostsData = cfPostsRequest.ok ? await cfPostsRequest.json() : [];
    for(const cfPosts of cfPostsData) {
        const card = document.createElement('div');
        card.className = "card";
  
        const cardHeader1 = document.createElement('div');
        cardHeader1.className = "card-header";
        const title = document.createElement('h5');
  
        const cardHeader2 = document.createElement('div');
        cardHeader2.className = "card-header";
        const companyName = document.createElement('h5');
  
        const cardHeader3 = document.createElement('div');
        cardHeader3.className = "card-header";
        const rating = document.createElement('h5');
  
        const cardFooter = document.createElement('div');
        cardFooter.className = "card-footer";
        const username = document.createElement('h6')
  
        const cardBody = document.createElement('div');
        cardBody.className = "card-body";
        const comment = document.createElement('p');
  
        const btnGroup = document.createElement('btn-group');

        const like = document.createElement('button');
        like.type = "button";
        like.className = "btn btn-outline-primary";
        like.innerText = "Like      ";

<<<<<<< Updated upstream
        const editPost = document.createElement('button');
        editPost.type = "button";
        editPost.className = "btn btn-outline-secondary";
        editPost.innerText = "Edit";
        //if(username does not match)
        //  editPost.style.display = "None";
=======
        const edit = document.createElement('button');
        edit.type = "button";
        edit.className = "btn btn-outline-secondary";
        edit.innerText = "Edit";
>>>>>>> Stashed changes

        const deletePost = document.createElement('button');
        deletePost.type = "button";
        deletePost.className = "btn btn-outline-danger";
        deletePost.innerText = "Delete";
        // if(username does not match)
        //  editPost.style.display = "None";

<<<<<<< Updated upstream
        
=======
        const currentUserRequest = await fetch(`/currentUser`);
        const currentUserData = currentUserRequest.ok ? await currentUserRequest.text() : [];
        console.log(cfPosts.username !== currentUserData);
        if(cfPosts.username !== currentUserData) {
            // editPost.style.display = "none";
            deletePost.style.display = "none";
        }

>>>>>>> Stashed changes
        title.innerText = "Title: " + cfPosts.title;
        username.innerText = "User: " + cfPosts.username;
        comment.innerText = cfPosts.comment;
        rating.innerText = "Rating: " + cfPosts.rating;
  
        const postId = cfPosts.postid;
        const companyNameRequest = await fetch(`../postCompany/${postId}`);
        const companyNameData = companyNameRequest.ok ? await companyNameRequest.json() : [];
        companyName.innerText = "Company: " + companyNameData[0].companyname;
  
        const postLikesRequest  = await fetch(`../likeCount/${postId}`);
        const postLikesData = postLikesRequest.ok ? await postLikesRequest.json() : [];
        const likeInt = postLikesData[0].count;
        const likeCount = document.createElement('span')
        likeCount.innerHTML = likeInt;
        like.appendChild(likeCount);
  
        like.addEventListener('click', async() => {
            const addLike = await fetch('/addLike', {
                method: 'POST',
                body: JSON.stringify({
                    postid: postId,
                    username: 'awoo',
                })
            });
            if (!addLike.ok) {
                console.error("Could not save the turn score to the server.");
            }
        });

        edit.addEventListener('click', function() {
            document.location.href = `../editPost/${postId}`;
        });

        deletePost.addEventListener('click', async() => {
            const deletePostResponse = await fetch(`../deletePost/${postId}`, {
                method: 'DELETE'
            });
            if(!deletePostResponse.ok) {
                console.error("Could not delete post.");
            }
            location.reload();
        })

        btnGroup.appendChild(like);
        btnGroup.appendChild(edit);
        btnGroup.appendChild(deletePost);
  
        cardHeader1.appendChild(title);
        cardHeader2.appendChild(companyName);
        cardHeader3.appendChild(rating);
        cardFooter.appendChild(username);
        cardBody.appendChild(comment);
  
        card.appendChild(cardHeader1);
        card.appendChild(cardHeader2);
        card.appendChild(cardHeader3);
        card.appendChild(cardBody);
        card.appendChild(btnGroup);
        card.appendChild(cardFooter);
  
        document.getElementById('cfPosts').appendChild(card);
        document.getElementById('cfPosts').appendChild(document.createElement('br'));
    }
  
    const cfCompaniesRequest = await fetch(`../cfCompany/${cfId}`);
    const cfCompaniesData = cfCompaniesRequest.ok ? await cfCompaniesRequest.json() : [];
    for(const cfCompanies of cfCompaniesData) {
        const company = document.createElement('h6');
        const companyOption = document.createElement('option');
  
        company.innerText = cfCompanies.companyname;
        companyOption.innerText = cfCompanies.companyname;
        companyOption.setAttribute('value', cfCompanies.companyid);
  
        document.getElementById('cfCompany').appendChild(company);
        document.getElementById('companyOption').appendChild(companyOption);
    }
  
    document.getElementById('submit').addEventListener('click', async () => {
        const createPostTitle = document.getElementById('title').value;
        const createPostRating = rating;
        console.log(createPostRating);
        const createPostComment = document.getElementById('comment').value;
        const createPostCompany = document.getElementById('companyOption').value;
  
        const createPost = await fetch('/create-post', {
            method: 'POST',
            body: JSON.stringify({
                careerfairid: cfId,
                companyid: createPostCompany,
                username: 'awoo',
                title: createPostTitle,
                rating: createPostRating,
                comment: createPostComment
            })
        });
        if (!createPost.ok) {
            console.error("Could not save the turn score to the server.");
        }
    });
 }); 