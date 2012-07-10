# Generate API docs using the JSDoc toolkit
# http://code.google.com/p/jsdoc-toolkit/

# Config options for the generator
PROJECT_DIR=/www/backbone-demo/
OUTPUT_DIR=$PROJECT_DIR/docs/
JSDOCDIR=/usr/local/jsdoc

#######################################
echo "Generating docs for $PROJECT_DIR"

# Cleanup doc dir
rm -rf $OUTPUT_DIR

# Generate new docs
java -jar $JSDOCDIR/jsrun.jar $JSDOCDIR/app/run.js -a \
	-t=$JSDOCDIR/templates/jsdoc \
	-d=$OUTPUT_DIR \
	$PROJECT_DIR/js/app/ \
	$PROJECT_DIR/js/model/ \
	$PROJECT_DIR/js/view/