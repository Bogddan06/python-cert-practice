// Python executes off the UI thread. The main page can terminate this worker.
let py;
self.onmessage = async ({data}) => {
  try {
    if (data.type === 'init') {
      const {loadPyodide} = await import('https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.mjs');
      py = await loadPyodide();
      self.postMessage({type:'ready'});
      return;
    }
    if (!py) throw new Error('Python is still loading.');
    py.globals.set('_request_json', JSON.stringify(data));
    const result = await py.runPythonAsync(`
import json as _json, io as _io, contextlib as _contextlib, traceback as _traceback, builtins as _builtins, os as _os, sys as _sys
_req = _json.loads(_request_json)
_ns = {'__name__': '__practice__'}
_output = _io.StringIO()
_cases = []
_error = None
_old_input = _builtins.input
_old_argv = _sys.argv[:]
_inputs = iter(_req.get('stdin', '').split('\\n'))
def _practice_input(prompt=''):
    print(prompt, end='')
    try:
        return next(_inputs)
    except StopIteration:
        raise EOFError('Add another line in Console input, then run again.')
_builtins.input = _practice_input
# Each run gets a fresh working directory. Files remain temporary to this worker.
import tempfile as _tempfile, shutil as _shutil
_old_cwd = _os.getcwd()
_tmp = _tempfile.mkdtemp(prefix='practice-')
_os.chdir(_tmp)
try:
    with _contextlib.redirect_stdout(_output), _contextlib.redirect_stderr(_output):
        try:
            exec(compile(_req['code'], 'main.py', 'exec'), _ns)
            for _case in _req.get('tests', []):
                try:
                    exec(compile(_case['code'], 'test.py', 'exec'), _ns)
                    _cases.append({'name': _case['name'], 'ok': True})
                except BaseException as _exc:
                    _cases.append({'name': _case['name'], 'ok': False, 'error': type(_exc).__name__ + ': ' + str(_exc)})
        except BaseException:
            _error = _traceback.format_exc()
finally:
    _builtins.input = _old_input
    _sys.argv = _old_argv
    _os.chdir(_old_cwd)
    _shutil.rmtree(_tmp, ignore_errors=True)
_json.dumps({'output': _output.getvalue()[:24000], 'tests': _cases, 'error': _error})
`);
    self.postMessage({type:'result',id:data.id,...JSON.parse(result)});
  } catch(error) {
    self.postMessage({type:'error',id:data.id,error:String(error?.message || error)});
  }
};
