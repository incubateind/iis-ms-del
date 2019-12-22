import os
import secrets
from PIL import Image
from flask import render_template, url_for, flash, redirect, request, abort
from gettesters import app, db, bcrypt
from gettesters.forms import RegistrationForm, LoginForm, UpdateAccountForm, PostForm
from gettesters.models import User, Post
from flask_login import login_user, current_user, logout_user, login_required
import pickle

@app.route("/")
@app.route("/home")
def home():
    if current_user.is_authenticated:
        kl = current_user.skills
        kl = kl.replace(" ","").lower()
        listOfUser = list(kl.split(","))
        with open("wordvecpickleslash.pickle", 'rb') as f:
            word_vec = pickle.load(f, encoding="latin1")
        final = listOfUser
        for x in listOfUser:
            res_list = [i[0] for i in word_vec.most_similar(x)[0:5]]
            final = final + res_list
        final = final[0:15]
        # print(final)
        # posts = Post.query.filter(Post.skills.contains('data'))
        for i in final:
            # print(Post.query.filter(Post.skills.contains("web-services")))
            if Post.query.filter(Post.skills.contains(i)).first() is not None:
                posts = Post.query.filter(Post.skills.contains(i))
                break

        # posts = Post.query.filter(Post.skills.in_(final))
        # print(Post.query.filter(Post.skills.in_(final)))
    else:
        posts = Post.query.all()
    return render_template('home.html', posts=posts)




@app.route("/register", methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, email=form.email.data, password=hashed_password, skills = form.skills.data)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)


@app.route("/login", methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('home'))
        else:
            flash('Login Unsuccessful. Please check email and password', 'danger')
    return render_template('login.html', title='Login', form=form)


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('home'))


def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(app.root_path, 'static/profile_pics', picture_fn)

    output_size = (125, 125)
    i = Image.open(form_picture)
    i.thumbnail(output_size)
    i.save(picture_path)

    return picture_fn


@app.route("/account", methods=['GET', 'POST'])
@login_required
def account():
    form = UpdateAccountForm()
    if form.validate_on_submit():
        if form.picture.data:
            picture_file = save_picture(form.picture.data)
            current_user.image_file = picture_file
        current_user.username = form.username.data
        current_user.email = form.email.data
        current_user.skills = form.skills.data
        db.session.commit()
        flash('Your account has been updated!', 'success')
        return redirect(url_for('account'))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.email.data = current_user.email
        form.skills.data = current_user.skills
    image_file = url_for('static', filename='profile_pics/' + current_user.image_file)
    return render_template('account.html', title='Account',
                           image_file=image_file, form=form)


@app.route("/post/new", methods=['GET', 'POST'])
# @login_required
def new_post():
    form = PostForm()
    if form.validate_on_submit():
        post = Post(title=form.title.data, link1 =form.link1.data, link2 = form.link2.data, skills = form.skills.data.lower().replace(" ",""), content=form.content.data, author = form.author.data)
        db.session.add(post)
        db.session.commit()
        flash('Your post has been created!', 'success')
        return redirect(url_for('home'))
    return render_template('create_post.html', title='New Post',
                           form=form, legend='New Product Listing')


@app.route("/post/<int:post_id>")
def post(post_id):
    post = Post.query.get_or_404(post_id)
    return render_template('post.html', title=post.title, post=post, link1 = post.link1, link2= post.link2, author = post.author)


@app.route("/post/<int:post_id>/update", methods=['GET', 'POST'])
@login_required
def update_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        abort(403)
    form = PostForm()
    if form.validate_on_submit():
        post.title = form.title.data
        post.content = form.content.data
        post.link1 = form.link1.data
        post.link2 = form.link2.data
        post.skills = form.skills.data
        db.session.commit()
        flash('Your post has been updated!', 'success')
        return redirect(url_for('post', post_id=post.id))
    elif request.method == 'GET':
        form.title.data = post.title
        form.content.data = post.content
        form.link1.data = post.link1
        form.link2.data = post.link2
        form.skills.data = post.skills
    return render_template('create_post.html', title='Update Product',
                           form=form, legend='Update Product')


@app.route("/post/<int:post_id>/delete", methods=['POST'])
@login_required
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        abort(403)
    db.session.delete(post)
    db.session.commit()
    flash('Your post has been deleted!', 'success')
    return redirect(url_for('home'))
