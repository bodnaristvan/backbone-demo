/**
 * Comment controller and view
 * DOM event and comment model event handlers should live here.
 * This view handles comment edit, delete and the sample text reverse actions, also
 * listens to model change and destroy events to update the view in DOM.
 *
 * @class CommentView
 * @extends Backbone.View
 * @author Bodnar Istvan <istvan@gawker.com>
 */
/*global Mustache, FormView */
var CommentView = Backbone.View.extend(
/** @lends CommentView.prototype */
	{
		/**
		 * Html tag name of the container element that'll be created when initializing new instance.
		 * This container is then accessible via the this.el (native DOM node) or this.$el (jQuery node)
		 * variables.
		 * @type String
		 */
		tagName: 'li',
	
		/**
		 * CSS class name of the container element
		 * @type String
		 */
		className: 'comment',
		
		/**
		 * The map of delegated event handlers
		 * @type Object
		 */
		 events: {
			'click .edit': 'edit',
			'click .delete': 'delete',
			'click .reverse': 'reverse'
		},
		
		/**
		 * View init method, subscribing to model events
		 */
		initialize: function () {
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
		},
		
		/**
		 * Render the new comment DOM element from a template using Mustache
		 * @returns {CommentView} Returns the view instance itself, to allow chaining view commands.
		 */
		render: function () {
			// template is rendered in the main html, inside a <script /> tag with the specified id
			var template = $('#comment-template').text();

			// variables passed to the template for rendering
			var template_vars = {
				author: this.model.get('author'),
				text: this.model.get('text')
			};
			
			// set the inner html of the container element to the Mustache rendered output
			this.$el.html(Mustache.to_html(template, template_vars));
			return this;
		},
		
		/**
		 * Edit button click handler
		 * @returns {Boolean} Returns false to stop propagation
		 */
		edit: function () {
			// create new FormView instance to edit the comment
			var formview = new FormView({model: this.model});
			
			// insert FormView instance after the comment container
			this.$el.after(formview.render().$el);
			
			// listen to save success event to handle successful form submit event
			formview.on('success', this.handleEditSuccess, this);
			return false;
		},
		
		/**
		 * Delete button click handler
		 * @returns {Boolean} Returns false to stop propagation
		 */
		delete: function () {
			// delete model from memory
			this.model.id = undefined;
			this.model.destroy();

			// note: since the view is subscribed to the models 'destroy' event, view will be also removed
			// automatically, no need to delete container form DOM
			return false;
		},
		
		/**
		 * "Reverse" button click handler
		 * @returns {Boolean} Returns false to stop propagation
		 */
		 reverse: function () {
			// run the models sample text reverse method
			this.model.reverseText();
			return false;
		},
		
		/**
		 * Handles form save success event
		 * @params {CommentModel} model Model returned by successful comment "save" action
		 */
		handleEditSuccess: function (model) {
			// create a new notification that is removed after 5 seconds
			var $notification = $('<div />')
									.text('Comment by ' + model.get('author') + ' is saved.')
									.addClass('notification');
			
			// append notification to edited comments container element
			this.$el.append($notification);
			
			// remove notification after 5 seconds
			setTimeout(function () {
				$notification.remove();
			}, 5000);
		},
		
		/**
		 * Override the default view remove method with custom actions
		 */
		remove: function () {
			// remove container element from DOM
			this.$el.remove();
		}
	}
);