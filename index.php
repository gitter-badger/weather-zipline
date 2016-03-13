<?php

namespace Index;

use \shgysk8zer0\Core as Core;
use \shgysk8zer0\DOM as DOM;

const PACKAGE   = './package.json';
const JS        = 'scripts/custom.js';
const CSS       = 'stylesheets/styles/styles.css';
const BTNWIDTH  = 50;
const BTNHEIGHT = 50;

spl_autoload_register('spl_autoload');
set_include_path(realpath('./classes'));

function build_head(\DOMElement $head, \stdClass $json)
{
	$json = json_decode(file_get_contents(PACKAGE));
	$head->append('title', $json->name);
	$head->append('meta', null, ['name' => 'description', 'content' => $json->description]);
	$head->append('meta', null, ['name' => 'keywords', 'content' => join(',', $json->keywords)]);
	$head->append('script', null, [
		'type' => 'application/javascript',
		'src' => JS,
		'async' => 'async'
	]);
	$head->append('link', null, [
		'rel' => 'stylesheet',
		'href' => CSS,
		'media' => 'all'
	]);
}

function build_body(\DOMElement $body, \stdClass $json)
{
	$header = $body->append('header');
	$header->append('h1', 'Your Local Weather');
	$container = $header->append('div');
	$container->append('button', 'Celsius', [
		'type' => 'button',
		'class' => 'toggle',
		'data-value' => 'metric',
		'disabled' => ''
	]);
	$container->append('button', 'Fahrenheit', [
		'type' => 'button',
		'class' => 'toggle',
		'data-value' => 'imperial',
		'disabled' => ''
	]);
	unset($header, $container);

	$body->append('main');
	$footer = $body->append('footer');
	$footer->append('a', null, [
		'role' => 'button',
		'href' => $json->repository->url,
		'target' => '_blank',
		'title' => 'View on GitHub'
	])->import(DOM\SVG::useIcon('mark-github', ['width' => BTNWIDTH, 'height' => BTNHEIGHT]));

	$footer->append('a', null, [
		'role' => 'button',
		'href' => $json->bugs->url,
		'target' => '_blank',
		'title' => 'View Issues'
	])->import(DOM\SVG::useIcon('issue-opened', ['width' => BTNWIDTH, 'height' => BTNHEIGHT]));
}

function init()
{
	$dom = DOM\HTML::getInstance();
	$dom->documentElement->class = 'loading';
	$json = json_decode(file_get_contents(PACKAGE));
	build_head($dom->head, $json);
	build_body($dom->body, $json);
	return $dom;
}
exit(init());
