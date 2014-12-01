/**
 * Collection for storing comment models
 * Default sorting methods (comparator method) can be specified here
 *
 * @class CommentCollection
 * @extends Backbone.Collection
 * @author Bodnar Istvan <istvan@gawker.com>
 */
define([
	'backbone',
	'model/commentmodel'
], function (
	Backbone,
	CommentModel
) {
	var CommentCollection = Backbone.Collection.extend(
	/** @lends CommentCollection.prototype */
		{
			/**
			 * Sets the allowed type of contained models
			 * @type Backbone.Model
			 */
			model: CommentModel
		}
	);

	return CommentCollection;
});