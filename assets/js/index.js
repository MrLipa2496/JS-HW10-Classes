const TAG_COLORS = {
  web: "green",
  javascript: "yellow",
  fullstack: "blue",
  education: "purple",
};

class Post {
  constructor(
    id,
    title,
    author,
    text,
    date,
    likes = 0,
    image = null,
    hashtags = []
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.text = text;
    this.date = date;
    this._likes = likes;
    this.image = image;
    this.hashtags = hashtags;
  }

  set likes(value) {
    if (value >= 0 && value <= 10000) {
      this._likes = value;
    } else {
      throw new Error("Likes must be between 0 and 10000");
    }
  }

  get likes() {
    return this._likes;
  }

  changeText(newText) {
    this.text = newText;
  }

  increaseLikes() {
    if (this.likes < 10000) {
      this.likes++;
    } else {
      throw new Error("Likes cannot exceed 10000");
    }
  }

  decreaseLikes() {
    if (this.likes > 0) {
      this.likes--;
    } else {
      throw new Error("Likes cannot be less than 0");
    }
  }

  addHashtag(tag) {
    const validTags = Object.keys(TAG_COLORS);
    if (validTags.includes(tag)) {
      if (this.hashtags.length < 6 && !this.hashtags.includes(tag)) {
        this.hashtags.push(tag);
      } else {
        throw new Error("Hashtags limit exceeded or tag already added");
      }
    } else {
      throw new Error("Invalid hashtag");
    }
  }

  render() {
    const { id, title, author, text, date, likes, image, hashtags } = this;
    const hashtagElements = hashtags
      .map(tag => `<span style="color: ${TAG_COLORS[tag]}">#${tag}</span>`)
      .join(" ");

    return `
            <div class="post" id="post-${id}">
                <h2 class = "title">${title}</h2>
                <p>Author: ${author}</p>
                <p>Date: ${date}</p>
                <p>${text}</p>
                ${
                  image
                    ? `<img class = "img" src="${image}" alt="Post Image">`
                    : ""
                }
                <p>Likes: ${likes}</p>
                <p>${hashtagElements}</p>
            </div>
        `;
  }
}

const post1 = new Post(
  1,
  "First Post",
  "Alice",
  "This is the first post",
  "2023-06-01"
);
post1.increaseLikes();
post1.addHashtag("web");
post1.addHashtag("javascript");

document.write(post1.render());

const post2 = new Post(
  2,
  "Second Post",
  "Bob",
  "This is the second post",
  "2023-06-02",
  50,
  "https://poprofessii.in.ua/Multimedia/CategoryImages/2021/11/17/155037_professiya_programmist-min.jpg"
);
document.write(post2.render());

post2.decreaseLikes();
post2.addHashtag("fullstack");
post2.addHashtag("education");

const posts = [post1, post2];
