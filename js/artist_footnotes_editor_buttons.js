/**
 * Created by kalaomer on 14.05.2015.
 */

(function(window, $) {
    tinymce.create("tinymce.plugins.artistFootnotes", {
        init: function(ed, url) {
            ed.addButton("addFootnote", {
                title: "Foot Note",
                cmd: "addFootnote",
                icon: "mce-ico mce-i-link",
                classes: "widget btn artist-footnotes-add-button"
            });

            ed.addButton("removeFootnote", {
                title:" Remove Foot Note",
                cmd: "removeFootnote",
                icon: "mce-ico mce-i-unlink",
                classes: "widget btn artist-footnotes-remove-button"
            });

            ed.addCommand('addFootnote', function(ui, v) {
                var selected_text = ed.selection.getContent({format: "raw"}),
                    result = '';

                if (!selected_text) {
                    ed.windowManager.open({
                        title: 'Foot Note',
                        body: [
                            {type: 'textbox', name: 'note', label: 'Note'}
                        ],
                        onsubmit: function(e) {
                            addFootnoteLinkElement(e.data.note);
                        }
                    });
                }

                addFootnoteLinkElement(selected_text);
            });

            ed.addCommand("removeFootnote", function(ui, v) {
                var selectedNode = ed.selection.getNode(),
                    selectedNodeText = selectedNode.innerHTML;

                if (selectedNode.nodeName == "SPAN" && _.indexOf(selectedNode.classList, "artist-footnote-link") !== false) {
                    selectedNode.remove();

                    ed.execCommand('mceInsertContent', 0, selectedNodeText);
                }
            });

            function addFootnoteLinkElement(text) {
                var result = document.createElement("span");
                result.innerHTML = text;
                result.className = "artist-footnote-link";

                ed.execCommand('mceInsertContent', 0, result.outerHTML);
            }
        }
    });

    tinymce.PluginManager.add( 'artist', tinymce.plugins.artistFootnotes );
})(window, jQuery);