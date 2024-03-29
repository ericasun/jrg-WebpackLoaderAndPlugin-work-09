const fs = require('fs');
const path = require('path');
const marked = require('marked'); // Ensure 'marked' is installed as a dependency

class MyHtmlWebpackPlugin {
    constructor(options) {
        this.options = options || {};
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('MyHtmlWebpackPlugin', (compilation, callback) => {
            const assetNames = Object.keys(compilation.assets);
            const jsFiles = assetNames.filter(name => name.endsWith('.js'));
            const html = this.generateHtml(jsFiles, this.options.title || 'Default Title');
            compilation.assets['index.html'] = {
                source: function () {
                    return html;
                },
                size: function () {
                    return html.length;
                }
            };
            callback();
        });
    }

    generateHtml(jsFiles, title) {
        let scriptTags = '';
        for (let file of jsFiles) {
            scriptTags += `<script src="${file}"></script>`;
        }

        let templatePath = this.options.template || './src/views/index.html';
        let template = fs.readFileSync(path.resolve(templatePath), 'utf8');

        // Process special directives like "<%= require('../path/to/article.md') %>"
        template = template.replace(/<%= require\(['"](.+?)['"]\) %>/g, (match, filePath) => {
            // Resolve the custom file path
            const resolvedPath = path.resolve(path.dirname(templatePath), filePath);
            
            // Read the file content
            let fileContent = fs.readFileSync(resolvedPath, 'utf8');

            // Check if the file has .md extension
            if (path.extname(resolvedPath) === '.md') {
                // If it's a Markdown file, compile it using marked
                return marked.parse(fileContent); // Ensure marked is used correctly
            } else {
                // Otherwise, just return the file content as it is
                return fileContent;
            }
        });

        // Replace script tags placeholder
        template = template.replace('<!-- scripts -->', scriptTags);
        
        // Replace title placeholder
        template = template.replace('<%= htmlWebpackPlugin.options.title %>', title);

        return template;
    }
}

module.exports = MyHtmlWebpackPlugin;


