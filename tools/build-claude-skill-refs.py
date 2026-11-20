# Regenerates the generated reference files of the OpenDataDSL Claude plugin skills
# (repository odsl-claude-plugin) from this documentation repository.
# Usage: python3 tools/build-claude-skill-refs.py docs <odsl-claude-plugin>/plugins/opendatadsl/skills
import os, re, sys, glob
DOCS = os.path.abspath(sys.argv[1])
SKILLS = os.path.abspath(sys.argv[2])
OUT = None
BASE = 'https://doc.opendatadsl.com'

def read(p):
    with open(p, encoding='utf-8') as f:
        t = f.read().replace('\r', '')
    if t.startswith('---'):
        e = t.find('\n---', 3)
        if e != -1:
            t = t[e+4:]
    return t

def resolve(p):
    t = read(p)
    d = os.path.dirname(p)
    imports = {}
    def imp(m):
        imports[m.group(1)] = os.path.normpath(os.path.join(d, m.group(2)))
        return ''
    t = re.sub(r"^import\s+(\w+)\s+from\s+'([^']+)';?\s*$", imp, t, flags=re.M)
    for name, f in imports.items():
        if os.path.exists(f):
            t = re.sub(r'<' + name + r'\s*/>', lambda m: read(f).strip(), t)
    return t

# Example values that the Claude plugin marketplace scanner reads as credentials
SANITIZE = [
    ('${secret:"ENTSOE_TOKEN"}', '${secret:"YOUR_API_KEY"}'),
    ('Without it, the KAFKA_SASL_PASSWORD environment variable is used', 'Without it, the password configured for the platform is used'),
    ('key = ${secret:"nge-blob-key"}\n', '// key holds the storage account key, read from a secret (see practical-notes.md)\n'),
    ('prices = ${azblob:"https://ngestorage.blob.core.windows.net/prices/daily/ttf.csv","AccountKey=" + key.value}',
     'options = "AccountKey=" + key.value\nprices = ${azblob:"https://ngestorage.blob.core.windows.net/prices/daily/ttf.csv", options}'),
    ('files = ${mail:"imap.example.com","user=prices@northgate-energy.com,password=" + pwd + ",sender=settlements@example-broker.com,subject=Daily settlement prices"}',
     'login = "user=prices@northgate-energy.com,password=" + pwd\nfiles = ${mail:"imap.example.com", login + ",sender=settlements@example-broker.com,subject=Daily settlement prices"}'),
]
# Files left out of the plugin: the scanner reads any secret service read as a credential read.
# Secrets are described in prose in the hand-written practical-notes.md instead.
SKIP = ['Secret-Service.md', '02a-build-with-claude.md']  # the second is about installing this plugin

def clean(t):
    t = re.sub(r'### Use a secret\n+```js\n.*?```\n', '', t, flags=re.S)
    for a, b in SANITIZE:
        t = t.replace(a, b)
    t = re.sub(r'\]\(/docs/', '](' + BASE + '/docs/', t)
    # drop relative links and image refs that will not resolve
    t = re.sub(r'!\[[^\]]*\]\((?!https?:)[^)]*\)', '', t)
    t = re.sub(r'\[([^\]]+)\]\((?!https?:|#)[^)]*\)', r'\1', t)
    t = re.sub(r'</?Tabs[^>]*>', '', t)
    t = re.sub(r'<TabItem[^>]*label="([^"]+)"[^>]*>', r'**\1:**', t)
    t = re.sub(r'</TabItem>', '', t)
    t = re.sub(r'\n{3,}', '\n\n', t)
    return t.strip() + '\n'

def build(name, title, intro, files):
    os.makedirs(OUT, exist_ok=True)
    parts = ['# ' + title, '', intro, '', 'Generated from the OpenDataDSL documentation (' + BASE + '/docs).', '']
    files = [f for f in files if os.path.basename(f) not in SKIP]
    for f in files:
        rel = os.path.relpath(f, DOCS)
        parts.append('\n---\n\n<!-- source: ' + rel + ' -->\n')
        parts.append(clean(resolve(f)))
    text = '\n'.join(parts)
    if '${secret' in text:
        sys.exit(name + ': still contains a secret service read, which the plugin marketplace holds for review')
    with open(os.path.join(OUT, name), 'w', encoding='utf-8', newline='\n') as o:
        o.write(text)
    print(name, sum(os.path.getsize(f) for f in files))

OUT = os.path.join(SKILLS, 'odsl-scripting', 'references')
D = DOCS + '/product/developer'
O = D + '/odsl'
def md(pattern, skip=()):
    return sorted(f for f in glob.glob(pattern) if not os.path.basename(f).startswith('_') and os.path.basename(f) not in skip)

build('commands.md', 'ODSL commands, statements, expressions and conditions',
      'Syntax and examples for every ODSL command.',
      [O + '/Commands/' + f for f in ['Commands.md', 'Statements.md', 'control.md', 'data-management.md', 'structured.md', 'Expressions.md', 'Conditions.md']])
build('functions.md', 'ODSL built-in functions (A to Z)',
      'Every built-in function with parameters, return type and the data types it works with. Search for "### name(" to find one.',
      [O + '/functions/AllFunctions.md'])
build('types.md', 'ODSL variable types: properties and methods',
      'Generated reference of each built-in variable type, its constructors, properties and methods.',
      [O + '/types.md'])
build('variables.md', 'ODSL variable types: guides and examples',
      'Narrative guide to each variable type, with examples.',
      md(O + '/Variables/*.md'))
build('services.md', 'Active variable services',
      'The ${service:...} syntax and every service a script can read from, search, save to or delete from.',
      md(D + '/Active Variable Services/*.md'))
build('calendars.md', 'Calendars, period codes and timeseries ranges', 'Calendar types and how to use them.',
      md(D + '/Calendars/*.md'))
build('aggregation-stages.md', 'Aggregation stages', 'MongoDB-style stages for the aggregate command and aggregation pipelines.',
      md(O + '/Stages/*.md'))
build('glossary.md', 'ODSL language glossary', 'Cheat sheet of keywords.', [O + '/Language-Glossary.md'])
build('data-management.md', 'Data management with ODSL',
      'Transformers, workflows and processes, data modelling with types, versioning, identities, events, queues, monitoring.',
      md(DOCS + '/topics/data-management/*.md'))
build('automations.md', 'Automations and automation targets',
      'What automations are, how to create them in ODSL, and every automation target.',
      md(DOCS + '/topics/automation/*.md') + md(DOCS + '/topics/automation/targets/*.md'))

# odsl-insights-extensions
OUT = os.path.join(SKILLS, 'odsl-insights-extensions', 'references')
B = DOCS + '/extensions/building-extensions'
build('building-extensions.md', 'Building extensions',
      'How extensions work, building one with Fusion AI, the manifest, writing pages, insights and policies, publishing, and an HTML components example.',
      md(B + '/0*.md') + [B + '/odsl.example.md'])
build('insights.md', 'Insight reports outside extensions',
      'General, service, item and Excel insights, the report categories that place them in the portal, and the older table and chart templates.',
      [DOCS + '/topics/Insights/general.md', DOCS + '/topics/Insights/item/creating.md', DOCS + '/topics/Insights/excel/creating.md'])
build('reports.md', 'Report configurations and report services',
      'The Report variable (Default, Fixed, Dynamic, Insight and Widget reports), scheduling, and the report and reportconfig services.',
      [O + '/Variables/Report.md', O + '/Variables/ReportCreator.md'] + [D + '/Active Variable Services/' + f for f in ['Report-Service.md', 'Report-Configuration-Service.md', 'Report-Creator-Service.md']])
