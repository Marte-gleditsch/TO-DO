
var UIController = (() => {

   var DOMstrings = {
      addTask: '.add_task',
      deleteBtn: '.delete',
      editBtn: '.edit',
      checkbox: '.checkbox',
      inputTask: '.new_task',
      tasks: '.tasks',
      editModeInput: '.editModeInput',
      editModeClass: '.editMode',
      taskDescription: '.task_description',
      container: '.container'
   }
   var ClassNames = {
      editModeInput: 'editModeInput',
      editMode: 'editMode',
      edit: 'edit',
      delete: 'delete',
      checkbox: 'checkbox',
      new: 'new_task',
      editIcon: 'fas fa-pen',
      deleteIcon: 'far fa-trash-alt'
   }
   function toggleFocus(listItem) {
      listItem.querySelector(DOMstrings.editModeInput).focus();
   }

   return {
      
      getInput: () => {
         return document.querySelector(DOMstrings.inputTask).value;
      },
   
      addTask: input => {
         var html, newHTML, element;

         element = DOMstrings.tasks;
         html = '<li class="listItem"><input type="checkbox" class="checkbox" %checked%><span class="checkmark"></span><label class="task_description">%description%</label><input class="editModeInput" type="text" value="%description2%" ><button class="edit"><i class="fas fa-pen"></i></button><button class="delete"><i class="far fa-trash-alt"></i></button></li>' 

         newHTML = html.replace('%description%', input);
         newHTML = newHTML.replace('%description2%', input);
         document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
      },
   
      getDOMStrings: () => {
         return DOMstrings;
      }, 

      getClasses: () => {
         return ClassNames;
      },

      clearFields: () => {
         document.querySelector(DOMstrings.inputTask).value = "";
      }, 

      showEditMode: event => {
         var listItem = event.target.parentNode.parentNode;
  
         listItem.classList.toggle(ClassNames.editMode);
         toggleFocus(listItem);
      },

      editTask: event => {
         if (event.target.className === ClassNames.editModeInput) {
            var listItem = event.target.parentNode;
         } else if (event.target.parentNode.className === ClassNames.edit) {
            var listItem = event.target.parentNode.parentNode;
         }
         var input = listItem.querySelector(DOMstrings.editModeInput).value;
         var label = listItem.querySelector(DOMstrings.taskDescription);

         label.innerText = input;
         listItem.classList.toggle(ClassNames.editMode);
      }, 

      deleteTask: event => {
         if (event.target.className === ClassNames.deleteIcon) {
            var listItem = event.target.parentNode.parentNode;
            var ulItem = event.target.parentNode.parentNode.parentNode;
            ulItem.removeChild(listItem);
         }
      },

      changeStatus: event => {
         if (event.target.className === ClassNames.checkbox) {
            var listItem = event.target.parentNode;
            var status = event.target.checked;
   
            if (status) {
               listItem.querySelector(DOMstrings.taskDescription).style.textDecoration = 'line-through';
               listItem.querySelector(DOMstrings.taskDescription).style.color = 'rgb(206, 206, 206)';
            } else if (!status) {
               listItem.querySelector(DOMstrings.taskDescription).style.textDecoration = 'none';
               listItem.querySelector(DOMstrings.taskDescription).style.color = 'rgb(138, 138, 138)';
            }
         }
      }
   };
})();



var Controller = (function(UI) {

   var setUpEventListeners = () => {
      var DOM = UI.getDOMStrings();
      var Classes = UI.getClasses();

      //Event listeners: Enter add item and change task
      document.addEventListener('keypress', event => {
         //Add item on enter
         if (event.keyCode === 13 && event.target.className === Classes.new) {
            addTask();
         
         //Change item on enter
         } else if (event.keyCode === 13 && event.target.className === Classes.editModeInput) {
            UI.editTask(event);
         }
      });

      //Event listener: Delete button
      document.querySelector(DOM.tasks).addEventListener('click', UI.deleteTask);
      
      //Event listener: Edit button
      document.querySelector(DOM.tasks).addEventListener('click', event => {
         if (event.target.parentNode.className === Classes.edit) {
            if (event.target.parentNode.parentNode.classList.contains(Classes.editMode)) {
               UI.editTask(event);
            } else {
               UI.showEditMode(event);
            }
         }
      });

      //Event listener: Checkbox
      document.querySelector(DOM.tasks).addEventListener('change', UI.changeStatus);

   };
   
   function addTask() {
      var input = UI.getInput();
      if (input !== '') {
         UI.addTask(input);
         UI.clearFields();
      }
   };
   
   return {
      init: () => {
         setUpEventListeners();
      }
   };

})(UIController);

Controller.init();


// 0. Initialization
//    Set up eventListeners

// 1. Add item
//    Add eventlistener on enter click
//    Add task to data structure
//    Add task to UI

// 2. Edit item
//    Toggle editMode class
//    Update data structure
//    Update UI
//    Add event listener on enter to toggle back editMode

// 3. Delete item
//    Update data structure
//    Update UI

// 4. Check item
//    Toogle checked status


// 5. Uncheck item
//    Toggle unchecked status

