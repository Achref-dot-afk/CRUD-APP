/*---------------------------Add User Property-------------------------------------------------------*/
let id = 1;
    const btn = document.querySelector('.add-user-btn');
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.style.backgroundColor = 'white';
        document.querySelector('.box').style.display = 'none';
        const nameInput = document.querySelector('#name');
        const emailInput = document.querySelector('#email');
        const phoneInput = document.querySelector('#phone');
        document.querySelector('.filter').style.backgroundColor = 'white';
        document.querySelector('#searchbar').style.backgroundColor = 'white';
        document.querySelector('#searchbar').style.border = '1px solid black';
        document.querySelector('.filter').style.border = '1px solid black';
        fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
        })
        }).then((res) => {
            if(res.ok){
                return res.json();
            }
        }).then ((data) => {
            AddUserField(data.name , data.email , data.phone , data.image);
        }
        );
    });

function AddUserField(name , email , phone , imageFile){
    const fieldContainer = document.createElement('div');
    fieldContainer.classList.add('field-container');
    document.querySelector('.users').appendChild(fieldContainer);
    const User = document.createElement('div');
    User.classList.add('user');
    fieldContainer.appendChild(User);
    const Id = document.createElement('p');
    Id.classList.add('user-id');
    Id.innerHTML = id;
    id++;
    User.appendChild(Id);
    const Image = document.createElement('img');
    Image.classList.add('user-image');
    User.appendChild(Image);
    Image.src = imageFile;
    const Name = document.createElement('p');
    Name.classList.add('user-name');
    User.appendChild(Name);
    Name.innerHTML = name;
    const Email = document.createElement('p');
    Email.classList.add('user-email');
    User.appendChild(Email);
    Email.innerHTML = email;
    const Phone = document.createElement('p');
    Phone.classList.add('user-phone');
    User.appendChild(Phone);
    Phone.innerHTML = phone;
    const Actions = document.createElement('div');
    Actions.classList.add('user-actions');
    User.appendChild(Actions);
    const Edit = document.createElement('i');
    Edit.classList.add('fas');
    Edit.classList.add('fa-edit');
    Actions.appendChild(Edit);
    const Delete = document.createElement('i');
    Delete.classList.add('fas');
    Delete.classList.add('fa-trash-alt');
    Actions.appendChild(Delete);
}
document.querySelector('.Adding').addEventListener('click', () => {
    document.querySelector('.box').style.display = 'block';
    document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    document.querySelector('.filter').style.backgroundColor = '#ccc';
    document.querySelector('.filter').style.border = 'none';
    document.querySelector('#searchbar').style.backgroundColor = '#ccc';
    document.querySelector('#searchbar').style.border = 'none';
});
/*---------------------------Delete User Property-------------------------------------------------------*/
    document.querySelector('.users').addEventListener('click', (event) => {
       if(event.target.classList.contains('fa-trash-alt')){
           const targetUser = event.target.closest('.field-container');
           if(targetUser){
               const targetUserData = {
                   name : targetUser.querySelector('.user-name').innerHTML,
                   email : targetUser.querySelector('.user-email').innerHTML,
                   phone : targetUser.querySelector('.user-phone').innerHTML,
               };
               fetch('http://localhost:3000/',{
                   method:'DELETE',
                   headers:{
                       'Content-Type' : 'application/json'
                },
                   body:JSON.stringify(targetUserData)
                }).then((res) => {
                    if(res.ok){
                        targetUser.remove();
                    }})
           }
       }
    });
/*---------------------------Edit User Property-------------------------------------------------------*/
    document.querySelector('.users').addEventListener('click', (event) => {
        if(event.target.classList.contains('fa-edit')){

        const targetUser = event.target.closest('.field-container');
        if(targetUser){
            const targetUserData = {
                name : targetUser.querySelector('.user-name').innerHTML,
                email : targetUser.querySelector('.user-email').innerHTML,
                phone : targetUser.querySelector('.user-phone').innerHTML,
            };
            document.querySelector('.box-2').style.display = 'block';
            document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            document.querySelector('.filter').style.backgroundColor = 'white';
            document.querySelector('#searchbar').style.backgroundColor = 'white';
            document.querySelector('#searchbar').style.border = '1px solid black';
            document.querySelector('.filter').style.border = '1px solid black';
            document.querySelector('.edit-user-btn').addEventListener('click', (e) => {
                const nameInput = document.querySelector('#name2');
                const emailInput = document.querySelector('#email2');
                const phoneInput = document.querySelector('#phone2');
                let UpdatedUser = {
                    name : nameInput.value,
                    email : emailInput.value,
                    phone : phoneInput.value,
                };
                document.querySelector('.box-2').style.display = 'none';
                document.body.style.backgroundColor = 'white';
                const requestedData = {
                    UpdatedUser : UpdatedUser,
                    targetUserData : targetUserData,
                }
                fetch('http://localhost:3000/',{
                   method:'PUT',
                   headers:{
                       'Content-Type' : 'application/json'
                },
                   body:JSON.stringify(requestedData)
                }).then((res) => {
                    if(res.ok){
                        return res.json();
                    }
                }).then((data) => {
                    targetUser.querySelector('.user-name').innerHTML = data.name;
                    targetUser.querySelector('.user-email').innerHTML = data.email;
                    targetUser.querySelector('.user-phone').innerHTML = data.phone;
                   
            }
            )
        });
        }
    }
}
    );

window.onload = () => {
    fetch('http://localhost:3000/users').then((res) => {
        if(res.ok){
            return res.json();
        }
    }).then((data) => {
        for(let i = 0; i < data.length; i++){
            AddUserField(data[i].name , data[i].email , data[i].phone , data[i].image);
        }
    });
};
document.querySelector('.closeAdd').addEventListener('click', () => {
    document.querySelector('.box').style.display = 'none';
    document.body.style.backgroundColor = 'white';
    document.querySelector('.filter').style.backgroundColor = 'white';
    document.querySelector('#searchbar').style.backgroundColor = 'white';
    document.querySelector('#searchbar').style.border = '1px solid black';
    document.querySelector('.filter').style.border = '1px solid black';
});
document.querySelector('.closeEdit').addEventListener('click', () => {
    document.querySelector('.box-2').style.display = 'none';
    document.body.style.backgroundColor = 'white';
    document.querySelector('.filter').style.backgroundColor = 'white';
    document.querySelector('#searchbar').style.backgroundColor = 'white';
    document.querySelector('#searchbar').style.border = '1px solid black';
    document.querySelector('.filter').style.border = '1px solid black';
});
/*-----------------------------------Search Bar-------------------------------------------------------*/
document.querySelector('#searchbar').addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase();
    const users = document.querySelectorAll('.user');
    users.forEach((user) => {
        const name = user.querySelector('.user-name').innerHTML.toLowerCase();
        const email = user.querySelector('.user-email').innerHTML.toLowerCase();
        const phone = user.querySelector('.user-phone').innerHTML.toLowerCase();
        if(name.includes(searchValue) || email.includes(searchValue) || phone.includes(searchValue)){
            user.style.display = 'grid';
        }else{
            user.style.display = 'none';
        }
    });
});
/*------------------------------------------Entries--------------------------------------------*/
document.querySelector('.filter').addEventListener('input', (e) => {
    const val = e.target.value; 
    const users = document.querySelectorAll('.user');

    for (let i = 0; i < users.length; i++) {
        if (i < val) {
            users[i].style.display = 'grid';
        } else {
            users[i].style.display = 'none';
        }
    }
});
