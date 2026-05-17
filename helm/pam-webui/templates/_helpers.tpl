{{/*
  _helpers.tpl — Common template helpers for pam-webui chart
*/}}

{{/*──────────────────────────────────────────────────────────────────────────
  Expand the name of the chart.
──────────────────────────────────────────────────────────────────────────*/}}
{{- define "pam-webui.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*──────────────────────────────────────────────────────────────────────────
  Create a default fully qualified app name.
  Truncated to 63 chars (Kubernetes label limit).
──────────────────────────────────────────────────────────────────────────*/}}
{{- define "pam-webui.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*──────────────────────────────────────────────────────────────────────────
  Chart name+version label.
──────────────────────────────────────────────────────────────────────────*/}}
{{- define "pam-webui.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*──────────────────────────────────────────────────────────────────────────
  Common labels applied to all resources.
──────────────────────────────────────────────────────────────────────────*/}}
{{- define "pam-webui.labels" -}}
helm.sh/chart: {{ include "pam-webui.chart" . }}
{{ include "pam-webui.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*──────────────────────────────────────────────────────────────────────────
  Selector labels — used in matchLabels & Service selector.
──────────────────────────────────────────────────────────────────────────*/}}
{{- define "pam-webui.selectorLabels" -}}
app.kubernetes.io/name: {{ include "pam-webui.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*──────────────────────────────────────────────────────────────────────────
  ServiceAccount name.
──────────────────────────────────────────────────────────────────────────*/}}
{{- define "pam-webui.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "pam-webui.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*──────────────────────────────────────────────────────────────────────────
  Full image reference: repository:tag
──────────────────────────────────────────────────────────────────────────*/}}
{{- define "pam-webui.image" -}}
{{- printf "%s:%s" .Values.image.repository (.Values.image.tag | default .Chart.AppVersion) }}
{{- end }}
