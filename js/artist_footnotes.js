(function(window, $) {

    var Footnotes = function() {
        this.area = $(".artist-footnotes-area");
        this.noteLinkElements = $(".artist-footnote-link");
        this.notes = this.getNotes();

        this.setNoteLinkElements();
        this.setArea();

        this.setShowContentArea();
        this.setEventsForShowArea();

        this.hideShowContent();
    };

    Footnotes.prototype = {
        getNotes: function() {
            var results = [],
                noteElements = this.noteLinkElements.get();

            for(var key in noteElements) {
                var element = noteElements[key];

                results.push(element.innerHTML);
            }

            return results;
        },

        setNoteLinkElements: function() {
            this.noteLinkElements.each(function(key) {
                this.innerHTML = key + 1;
            });
        },

        setArea: function() {
            var olElement = $("<ol></ol>").attr("id", "artist-footnote-area-list"),
                liElementTemplate = $("<li></li>").addClass("artist-footnote");

            for(var key in this.notes) {
                var noteHTML = this.notes[key],
                    liElement = liElementTemplate.clone(),
                    idNumber = parseInt(key) + 1;

                liElement.html(noteHTML)
                    .attr("id", "artist-footnote-" + idNumber);

                olElement.append(liElement);
            }

            this.area.append(olElement);
        },

        setShowContentArea: function() {
            var divElement = $("<div></div>").attr("id", "artist-footnote-show-content-area");

            this.showContentArea = divElement;

            $("body").append(divElement);
        },

        setEventsForShowArea: function() {
            var self = this;

            $(document).click(function(e) {
                if (
                    !$(e.target).is('#artist-footnote-show-content-area, #artist-footnote-show-content-area *, .artist-footnote-link')
                ) {
                    self.hideShowContent();
                }
            });

            this.noteLinkElements.click(function() {
                var noteHTML = $("li#artist-footnote-" + this.innerHTML).html();

                if (self.showContentArea.html() == noteHTML) {
                    return self.hideShowContent();
                }

                return self.showShowContent(noteHTML);
            });
        },

        hideShowContent: function() {
            this.showContentArea.removeClass("active")
                .html('');
        },

        showShowContent: function(html) {
            this.showContentArea.html(html)
                .addClass("active");
        }
    };

    $(function() {
        var footnotes = new Footnotes();
    });
})(window, jQuery);
