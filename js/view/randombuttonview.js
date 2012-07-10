/**
 * Random comment generator button
 *
 * @class RandomButtonView
 * @extends Backbone.View
 * @author Bodnar Istvan <istvan@gawker.com>
 */
/*global CommentModel, FormView */
var RandomButtonView = Backbone.View.extend(
/** @lends RandomButtonView.prototype */
	{
		/**
		 * The map of delegated event handlers
		 * @type Object
		 */
		events: {
			'click': 'createComment'
		},
		
		/**
		 * Initialize view, make sure button has a comment collection to work with
		 */
		initialize: function () {
			if (this.collection === undefined) {
				throw 'NoCollectionDefined';
			}
		},
		
		/**
		 * Click event handler that creates 5 new comment models with random texts
		 * @returns {Boolean} Returns false to stop propagation
		 */
		createComment: function () {
			var i;
			for (i = 0; i < 5; i++) {
				this.collection.add(new CommentModel({
					text: 'Random comment ' + Math.floor(Math.random() * 100),
					author: 'serif'
				}));
			}

			// return false to stop event propagation
			return false;
		}
	}
);
