/* global $,api,STORE ,bookMarks*/
'use strict';
const bookMarks = (function(){
 
  
  
  function generateDefultHeader(){
    return  `
        <div class="button-controler">
          <button class="add-bookmark">Add Bookmarks</button>
          <select name="rating-filter">
              <option value="all">all</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
          </select>
        </div>`;
    
  }
    
  function generateEditNewHeader(){
    return `<form class="formEditor" role="form">
        <label for="book-title">Create New Bookmark</label><br>
        <input type="input-text" name="title" id="title" placeholder="facebook">
        <input type="intput-text" name="url" id="url" placeholder="https://www.facebook.com/"><br>
        <input type="input-text" name="description" id="description" placeholder="description">
     <div class="star-create-rating">
          <input type="radio" name="create-rating" value="1" class="star-create-rating" checked><label for="create-rating">1</label>
          <input type="radio" name="create-rating" value="2" class="star-create-rating"><label for="create-rating">2</label>
          <input type="radio" name="create-rating" value="3" class="star-create-rating"><label for="create-rating">3</label>
          <input type="radio" name="create-rating" value="4" class="star-create-rating"><label for="create-rating">4</label>
          <input type="radio" name="create-rating" value="5" class="star-create-rating"><label for="create-rating">5</label>
      </div>
      <button class="add-bookmark-42" type="submit">Add Bookmark</button>
      <button class="cancel-edit-button" type="button">Cancel</button>
   </form>`;
  }
  // generateStarRating();
  function generateDefultbookmark(booklist){
    return `<li class="book-item" data-item-id="${booklist.id}">
    <h2>${booklist.title}</h2>
    <div class="star-rating">
        <input type="radio" name="rating" value="1" class="star-rating" checked><label for="rating">1</label>
        <input type="radio" name="rating" value="2" class="star-rating"><label for="rating">2</label>
        <input type="radio" name="rating" value="3" class="star-rating"><label for="rating">3</label>
        <input type="radio" name="rating" value="4" class="star-rating"><label for="rating">4</label>
        <input type="radio" name="rating" value="5" class="star-rating"><label for="rating">5</label>
    </div>
    <button class="remove-bookmark">Delete</button>
</li>`;
  }

  function generateExpandedBookmark(booklist){
    return `<li class="book-item" data-item-id="${booklist.id}">
      <h2>${booklist.title}</h2>
      <div class="list-expanded">
          <p>${booklist.description}</p>
          <a href="${booklist.url}">Visit website</a>
          <div class="star-expanded-rating">
              <input type="radio" name="expanded-rating" value="1" class="star-expanded-rating" checked><label for="expanded-rating">1</label>
              <input type="radio" name="expanded-rating" value="2" class="star-expanded-rating"><label for="expanded-rating">2</label>
              <input type="radio" name="expanded-rating" value="3" class="star-expanded-rating"><label for="expanded-rating">3</label>
              <input type="radio" name="expanded-rating" value="4" class="star-expanded-rating"><label for="expanded-rating">4</label>
              <input type="radio" name="expanded-rating" value="5" class="star-expanded-rating"><label for="expanded-rating">5</label>
          </div>
          <button class="remove-bookmark">remove</button>
      </div>
  </li>`;
  }
    
  
  // handleAddItem();
  // handleDeleteItem();
  // handleStarEditing();
  // handleRatingFilter();
  const render = function(){
    let head = (STORE.addingBookmark) ? generateEditNewHeader() : generateDefultHeader();
    let bookmarks = (STORE.ratingFilter === 'all') ? STORE.booklist : STORE.booklist.filter(obj => obj.rating >= STORE.ratingFilter);
    let bookmarkList = bookmarks.map(bookie =>{
      if(bookie.expanded){
        return generateExpandedBookmark(bookie);
      }else{
        return generateDefultbookmark(bookie);
      }
    });
    $('.main-default-container').html(head);
    $('.bookmark-list').html(bookmarkList);
  };

  function handleShowAddBookmarkForm(){
    $('.main-default-container').on('click','.add-bookmark',function(){
      STORE.toggleAddForDisplayed();
      render();
    });
  }

  function handleCancelForm(){
    $('.main-default-container').on('click','.cancel-edit-button',function(){
      STORE.toggleAddForDisplayed();
      render();
    });
  }

  function handleAddBookmarkSubmit(){
    $('main-default-container').on('submit','.add-bookmark42',function(event){
      event.preventDefault();
      console.log(event);
      const newTitle = $('#title').val; 
      const newUrl = $('#url').val;
      const newDescription = $('#description').val;
      const newRating = $('input[type="radio"] [name="rating"]:checked').val;
      let newobj={
        newTitle,
        newUrl,
        newDescription,
        newRating
      };
      STORE.addBookmark(newobj);
      STORE.toggleAddForDisplayed();
      render();
    });
    
      
  }
  function findTargetId(item){
    return $(item)
      .closest('.book-item')
      .attr('data-item-id');
  }
  function handleToggleExpandBookmark(){
    $('.bookmark-list').on('click','.book-item',function(event){
      let itemId = findTargetId(event.currentTarget);
      let bookmark = STORE.booklist.find(booker => itemId === booker.id);
      if(!bookmark.editer){
        STORE.toggleExpandBookmark(itemId);
        render();
      }
    });
  }
  function serializeJson(form) {
    const formData = new FormData(form);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return JSON.stringify(o);
  }

  const mainHandleControler= (function(){
    handleShowAddBookmarkForm();
    handleCancelForm();
    handleAddBookmarkSubmit();
    handleToggleExpandBookmark();
    
  });

  return{ 
    render,
    mainHandleControler
  };
}());