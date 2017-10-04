function Model(data){
  var self = this;

  self.data = data;

  self.find = function (array, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id == value) return i;
    }
    return -1;
  };

  self.del = function (item) {
    self.data.splice(item, 1);
    return self.data;
  }

  self.add = function (item) {
    self.data.push(item);
    return self.data;
  };



};



function View(model){
  var self = this;

  self.elements = {
    left: $('.userBlock'),
    right: $('.right'),
    addBtn: $('.addBtn'),

  };


//==========Show-Hide==========

//----------Plus button----------
    self.addBtnShow = function (){
      var button = self.elements.addBtn;
      button.show();
    };

    self.addBtnHide = function (){
      var button = self.elements.addBtn;
      button.hide();
    };

//----------Right----------
    self.rightShow = function (){
      var right = self.elements.right;
      right.show();
    };

    self.rightHide = function (){
      var right = self.elements.right;
      right.hide();
    };


//==========Functions==========

  self.init = function (data) {
    self.elements.left.html(data)
  };

  self.initate = function (data) {
    self.elements.right.html(data)
  };

  self.open = function (data){
    var right = self.elements.right;
    right.html(data);
  };

  self.del = function (id) {
    $('#' + id).slideUp();
    return self.data;
  };

  self.add = function (data){
    var right = self.elements.right;
    right.html(data);
  };



};



function Controller(model, view){
  var self = this;

  $(document).delegate( ".userBtn", "click", open);
  $(document).delegate( ".userDel", "click", del);
  //edit
  $(document).delegate( ".addBtn", "click", add);
  $(document).delegate( ".saveUser", "click", save);
  $(document).delegate( ".cancelUser", "click", cancel);

  function open (){
    var id = $(this).attr('value');
    var i = model.find(model.data, id);
    var item = model.data[i];

    $.ajax({
      method: "POST",
      url: "/users/open",
      data: item
    }).done(function(data){
      console.log('ok')
       view.open(data);
       view.addBtnShow();
       view.rightShow();
    });
    return false;
  };

  function del () {
    var id = $(this).attr('value');
    var i = model.find(model.data, id);

    model.del(i);
    view.del(id);
    view.addBtnShow();
    view.rightHide();
  }

  function add() {
    $.ajax({
      method: "POST",
      url: "/users/add",
    }).done(function (data){
      view.add(data);
      view.addBtnHide();
      view.rightShow();
      console.log('ok')
    });
    return false;
  };

  function save () {
    var user = {
      name: $('.name').val(),
      lastName: $('.lastname').val(),
      // status: ,
      date: $('.addDate > input').val(),
      sex: $('.addSex > select').val(),
      address: $('.addAddress > input').val(),
      phone: $('.addPhone > input').val(),
      program: $('.addProgram > select').val(),
      shelter: $('.addShelter > select').val(),
      discription: $('.addDiscription > textarea').val(),
      id: Date.now(),
    };
    console.log(user);

    model.add(user);
    self.init();
    view.addBtnShow();
    view.rightHide();

    return false;
  };

  function cancel() {
    view.addBtnShow();
    view.rightHide();
    console.log('Cancel...');
    return false;
  };






  self.init = function () {
    var item = model.data[0];
    $.ajax({
      method: "POST",
      url: "/users/init",
      data: {
        users: model.data,
      }
    }).done(function(data){
      view.init(data);
      return;
    });
    $.ajax({
      method: "PUT",
      url: "/users/init",
      data: item,
    }).done(function(data){
      view.initate(data);

    });
  };

  self.init();



};



$(function(){
  var data = [
    {
      name: 'Sarah',
      lastName: 'Conor',
      address: '9055-9057 Normandie Ave',
      id: 1,
      date: '01.01.2007',
      payments:[
        {date: '01.02.2013', sum: '1234'},
        {date: '01.02.2013', sum: '1234'},
        {date: '01.02.2013', sum: '1234'},
        {date: '01.02.2013', sum: '1234'},
        {date: '01.02.2013', sum: '1234'},
        {date: '01.02.2013', sum: '1234'},
      ],
    },
    {
      name: 'John',
      lastName: 'Dou',
      address: '9055 Normandie Ave',
      id: 2,
      date: '12.10.1996',
      payments:[
        {date: '01.02.2013', sum: '1234'},
        {date: '01.02.2013', sum: '1234'},
        {date: '01.02.2013', sum: '1234'},
        {date: '01.02.2013', sum: '1234'},
        {date: '01.02.2013', sum: '1234'},
        {date: '01.02.2013', sum: '1234'},
      ],
    },
    {
      name: 'Lary',
      lastName: 'Zibherman',
      address: '9055-9057 Normandie Str',
      id: 3,
      date: '30.06.2020',
      payments:[
        {date: '01.02.2013', sum: '1234'},
        {date: '01.02.2013', sum: '1234'},
        {date: '01.02.2013', sum: '1234'},
        {date: '01.02.2013', sum: '1234'},
        {date: '01.02.2013', sum: '1234'},
        {date: '01.02.2013', sum: '1234'},
      ],
    },
  ];
  var model = new Model(data);
  var view = new View(model);
  var controller = new Controller(model, view);
});
