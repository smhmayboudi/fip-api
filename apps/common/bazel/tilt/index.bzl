BAZEL_RUN_CMD = """
  bazelisk --batch run \
    --workspace_status_command='echo $EXPECTED_REF | cut -d: -f3 | xargs echo COMMIT_SHA' %s
  """

BAZEL_BUILDFILES_CMD = """
  bazelisk --batch query \
    'filter("^//", buildfiles(deps(set(%s))))' \
    --order_output=no
  """.strip()

BAZEL_SOURCES_CMD = """
  bazelisk --batch query \
    'filter("^//", kind("source file", deps(set(%s))))' \
    --order_output=no
  """.strip()

def bazel_labels_to_files(labels):
  files = {}
  for l in labels:
    if l.startswith("//external/") or l.startswith("//external:"):
      continue
    elif l.startswith("//"):
      l = l[2:]

    path = l.replace(":", "/")
    if path.startswith("/"):
      path = path[1:]

    files[path] = None

  return files.keys()

def watch_labels(labels):
  watched_files = []
  for l in labels:
    if l.startswith("@"):
      continue
    elif l.startswith("//external/") or l.startswith("//external:"):
      continue
    elif l.startswith("//"):
      l = l[2:]

    path = l.replace(":", "/")
    if path.startswith("/"):
      path = path[1:]

    watch_file(path)
    watched_files.append(path)

  return watched_files

def bazel_build(image, target):
  build_deps = str(local(BAZEL_BUILDFILES_CMD % target)).splitlines()
  watch_labels(build_deps)

  source_deps = str(local(BAZEL_SOURCES_CMD % target)).splitlines()
  source_deps_files = bazel_labels_to_files(source_deps)

  custom_build(
    ref = image,
    command = BAZEL_RUN_CMD % target,
    deps = source_deps_files,
    tag = "",
    disable_push = True,
    skips_local_docker = True,
  )

# def bazel_k8s(target):
#   build_deps = str(local(BAZEL_BUILDFILES_CMD % target)).splitlines()
#   watch_labels(build_deps)
  
#   source_deps = str(local(BAZEL_SOURCES_CMD % target)).splitlines()
#   watch_labels(source_deps)

#   return local("bazelisk run %s" % target)
